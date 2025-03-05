import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto, CreateAboutDto } from './dto/create-static.dto';
import { AppSuccess } from 'src/utils/AppSuccess';
import { UpdateStaticDto } from './dto/update-static.dto';

@Injectable()
export class StaticService {
  constructor(private prisma: PrismaService) {}

  async createAbout(data: CreateAboutDto) {
    const about = data;

    const staticData = await this.prisma.static.findFirst({});

    if (!staticData) {
      const abouts = await this.prisma.static.create({
        data: {
          about: {
            create: {
              content: about.content,
              location: about.location,
              time: about.time,
            },
          },
        },
        include: { about: true },
      });
      return new AppSuccess(abouts, 'Static data created successfully');
    }

    const abouts = await this.prisma.static.update({
      where: { id: staticData.id },
      data: {
        about: {
          update: about,
        },
      },
      include: { about: true },
    });
    return new AppSuccess(abouts, 'Static data created successfully');
  }

  async createQuestions(data: CreateQuestionDto) {
    const questions = data;

    const staticData = await this.prisma.static.findFirst({});

    if (!staticData) {
      const questionss = await this.prisma.static.create({
        data: {
          questions: { createMany: { data: questions } },
        },
      });
      return new AppSuccess(questionss, 'Static data created successfully');
    }

    const questionss = await this.prisma.static.update({
      where: { id: staticData.id },
      data: {
        questions: {
          createMany: {
            data: questions,
          },
        },
      },
    });
    return new AppSuccess(questionss, 'Static data created successfully');
  }

  async getStatic() {
    return new AppSuccess(
      await this.prisma.static.findFirst({
        include: { about: true, questions: true },
      }),
      'Static data retrieved successfully',
    );
  }

  async updateAbout(id: string, data: UpdateStaticDto) {
    await this.ensureStaticExists(id);

    const { about } = data;

    return new AppSuccess(
      await this.prisma.static.update({
        where: { id },
        data: {
          about: {
            update: about,
          },
        },
      }),
      'Static data updated successfully',
    );
  }

  async updateQuestion(id: string, data: CreateQuestionDto) {
    const question = await this.prisma.questions.findUnique({
      where: { id },
    });

    if (!question) throw new NotFoundException('Question not found');

    return new AppSuccess(
      await this.prisma.questions.update({
        where: { id },
        data: {
          ...data,
        },
      }),
      'Question updated successfully',
    );
  }

  async deleteStatic(id: string) {
    await this.ensureStaticExists(id);
    return this.prisma.static.delete({ where: { id } });
  }

  private async ensureStaticExists(id: string) {
    const exists = await this.prisma.static.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Static not found');
  }
}
