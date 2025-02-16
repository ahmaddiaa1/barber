import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { hash } from 'bcrypt';
import {
  admin,
  barbers1,
  barbers2,
  barbers3,
  BeardServices,
  branches,
  categories,
  clients,
  HairCareServices,
  HairCutServices,
} from 'mock/user';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MockService {
  constructor(private readonly prisma: PrismaService) {}
  async createMockClientData() {
    await this.prisma.client.deleteMany();
    await this.prisma.admin.deleteMany();
    await this.prisma.barber.deleteMany();
    await this.prisma.cashier.deleteMany();
    await this.prisma.user.deleteMany();

    const client = clients.map(async (client) => {
      console.log(client);
      await this.prisma.user.create({
        data: {
          firstName: client.firstName,
          lastName: client.lastName,
          password: await hash(client.password, 10),
          phone: client.phone,
          role: Role[client.role.toUpperCase()],
          client: {
            create: {
              referralCode: client.referralCode,
            },
          },
        },
      });

      return client;
    });

    const admins = admin.map(async (admin) => {
      await this.prisma.user.create({
        data: {
          firstName: admin.firstName,
          lastName: admin.lastName,
          password: await hash(admin.password, 10),
          phone: admin.phone,
          role: Role[admin.role.toUpperCase()],
          admin: {
            create: {},
          },
        },
      });

      return admin;
    });

    const branchPromises = branches.map(async (branch) => {
      const createdBranch = await this.prisma.branch.create({
        data: {
          name: branch.name,
          location: branch.location,
          phone: branch.phone,
          branchImg: branch.branchImg,
        },
      });
      return createdBranch;
    });

    const createdBranches = await Promise.all(branchPromises);

    const barber1 = barbers1.map(async (barber) => {
      await this.prisma.user.create({
        data: {
          firstName: barber.firstName,
          lastName: barber.lastName,
          password: await hash(barber.password, 10),
          phone: barber.phone,
          role: Role[barber.role.toUpperCase()],
          barber: {
            create: {
              branchId: createdBranches[0].id,
            },
          },
        },
      });
    });
    const barber2 = barbers2.map(async (barber) => {
      await this.prisma.user.create({
        data: {
          firstName: barber.firstName,
          lastName: barber.lastName,
          password: await hash(barber.password, 10),
          phone: barber.phone,
          role: Role[barber.role.toUpperCase()],
          barber: {
            create: {
              branchId: createdBranches[1].id,
            },
          },
        },
      });
    });
    const barber3 = barbers3.map(async (barber) => {
      await this.prisma.user.create({
        data: {
          firstName: barber.firstName,
          lastName: barber.lastName,
          password: await hash(barber.password, 10),
          phone: barber.phone,
          role: Role[barber.role.toUpperCase()],
          barber: {
            create: {
              branchId: createdBranches[2].id,
            },
          },
        },
      });
    });

    const category = categories.map(async (category) => {
      const c = await this.prisma.category.create({
        data: {
          name: category.name,
        },
      });
      return c;
    });
    const createdCategories = await Promise.all(category);

    const serviceBeard = BeardServices.map(async (service) => {
      await this.prisma.service.create({
        data: {
          name: service.name,
          price: service.price,
          duration: service.duration,
          categoryId: createdCategories[1].id,
        },
      });
    });
    const serviceCare = HairCareServices.map(async (service) => {
      await this.prisma.service.create({
        data: {
          name: service.name,
          price: service.price,
          duration: service.duration,
          categoryId: createdCategories[0].id,
        },
      });
    });
    const serviceCut = HairCutServices.map(async (service) => {
      await this.prisma.service.create({
        data: {
          name: service.name,
          price: service.price,
          duration: service.duration,
          categoryId: createdCategories[2].id,
        },
      });
    });

    await Promise.all([
      ...client,
      ...admins,
      ...barber1,
      ...barber3,
      ...barber2,
    ]);

    return {
      client,
      admins,
      barber1,
      barber2,
      barber3,
      category,
      serviceBeard,
      serviceCare,
      serviceCut,
    };
  }
}
