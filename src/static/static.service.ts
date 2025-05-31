import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto, CreateAboutDto } from './dto/create-static.dto';
import { AppSuccess } from 'src/utils/AppSuccess';
import { UpdateStaticDto } from './dto/update-static.dto';

@Injectable()
export class StaticService {
  constructor(private prisma: PrismaService) {}

  async createAbout(data: CreateAboutDto) {
    const staticData = await this.prisma.static.findFirst({
      select: { about: true, id: true },
    });

    if (!staticData) {
      const about = await this.prisma.static.create({
        data: {
          about: {
            create: {
              content: data.content,
              location: data.location,
              time: data.time,
            },
          },
        },
        include: { about: true },
      });
      return new AppSuccess(about, 'Static data created successfully');
    }
    if (!staticData.about) {
      const about = await this.prisma.static.update({
        where: { id: staticData.id },
        data: {
          about: {
            create: {
              content: data.content,
              location: data.location,
              time: data.time,
            },
          },
        },
        include: { about: true },
      });
      return new AppSuccess(about, 'Static data created successfully');
    }
    const about = await this.prisma.about.update({
      where: { id: staticData.id },
      data: {
        content: data.content,
        location: data.location,
        time: data.time,
      },
    });
    return new AppSuccess(about, 'Static data created successfully');
  }

  async createQuestions(data: CreateQuestionDto) {
    const questions = data;

    const staticData = await this.prisma.static.findFirst({});

    if (!staticData) {
      const questionsDate = await this.prisma.static.create({
        data: {
          questions: { createMany: { data: questions } },
        },
      });
      return new AppSuccess(questionsDate, 'Static data created successfully');
    }

    const questionsDate = await this.prisma.static.update({
      where: { id: staticData.id },
      data: {
        questions: {
          createMany: {
            data: questions,
          },
        },
      },
      select: {
        questions: { select: { id: true, question: true, answer: true } },
      },
    });
    return new AppSuccess(questionsDate, 'Static data created successfully');
  }

  async getStatic() {
    return new AppSuccess(
      await this.prisma.static.findFirst({
        include: { about: true, questions: true },
      }),
      'Static data retrieved successfully',
    );
  }

  async updateAbout(data: UpdateStaticDto) {
    const Firstabout = await this.prisma.static.findFirst({
      select: { about: true },
    });
    const { about } = data;
    console.log(Firstabout, data);

    return new AppSuccess(
      await this.prisma.about.update({
        where: { id: Firstabout.about.id },
        data: {
          location: about.location,
          ...about,
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

  async deleteQuestion(id: string) {
    const ExistQuestion = await this.prisma.questions.findUnique({
      where: { id },
    });

    !ExistQuestion && new NotFoundException('Question not found');

    const question = await this.prisma.questions.delete({ where: { id } });
    return new AppSuccess(question, 'Question deleted successfully');
  }

  async ensureStaticExists(id: string) {
    const exists = await this.prisma.static.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Static not found');
  }
}
