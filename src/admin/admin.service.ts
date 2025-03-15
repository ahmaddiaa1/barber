import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppSuccess } from 'src/utils/AppSuccess';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAdminDto: CreateAdminDto) {
    const settings = await this.prisma.settings.findFirst();
    if (!settings) {
      return this.prisma.settings.create({
        data: createAdminDto,
      });
    }
  }

  async findAll() {
    const settings = await this.prisma.settings.findFirst();

    if (!settings) {
      return new NotFoundException(null, 'Settings not found');
    }

    return new AppSuccess(settings, 'Settings fetched successfully');
  }

  async update(updateAdminDto: UpdateAdminDto) {
    const ExistingSettings = await this.prisma.settings.findFirst();
    if (!ExistingSettings) {
      return new NotFoundException(null, 'Settings not found');
    }
    const settings = await this.prisma.settings.update({
      where: { id: ExistingSettings.id },
      data: updateAdminDto,
    });

    if (updateAdminDto.slotDuration) {
      const slots = (await this.prisma.slot.findMany({})).map((slot) => {
        return {
          slot: slot.slot,
          id: slot.id,
          start: slot.start,
          end: slot.end,
        };
      });

      Promise.all([
        slots.map(async (slot) => {
          return this.prisma.slot.update({
            where: { id: slot.id },
            data: {
              slot: await this.generateSlots(
                slot.start,
                slot.end,
                updateAdminDto.slotDuration,
              ),
            },
          });
        }),
      ]);
    }

    return new AppSuccess(settings, 'Settings updated successfully');
  }

  private async generateSlots(start: number, end: number, duration: number) {
    const slotsArray = [];
    for (let time = start * 60; time < end * 60; time += duration) {
      let hour = Math.floor(time / 60);
      let minute = time % 60;
      let formattedHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      let period = hour >= 12 ? 'PM' : 'AM';
      let slot = `${formattedHour.toString().padStart(2, '0')}:${minute
        .toString()
        .padStart(2, '0')} ${period}`;
      slotsArray.push(slot);
    }
    return slotsArray;
  }
}
