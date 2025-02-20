import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MockService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly clients = [
    {
      firstName: 'client',
      lastName: 'no.1',
      phone: '1234567891',
      password: '1234',
      role: 'user',
      referralCode: 'AK3dm3cs',
    },
    {
      firstName: 'client',
      lastName: 'no.2',
      phone: '1234567892',
      password: '1234',
      role: 'user',
      referralCode: 'K2skn2nl1',
    },
    {
      firstName: 'client',
      lastName: 'no.3',
      phone: '1234567893',
      password: '1234',
      role: 'user',
      referralCode: 'ak5fn3fs',
    },
    {
      firstName: 'client',
      lastName: 'no.4',
      phone: '1234567894',
      password: '1234',
      role: 'user',
      referralCode: 'Af0gn3m2',
    },
    {
      firstName: 'client',
      lastName: 'no.5',
      phone: '1234567895',
      password: '1234',
      role: 'user',
      referralCode: 'mASd932j',
    },
    {
      firstName: 'client',
      lastName: 'no.6',
      phone: '1234567896',
      password: '1234',
      role: 'user',
      referralCode: 'ASD9dw2d,',
    },
    {
      firstName: 'client',
      lastName: 'no.7',
      phone: '1234567897',
      password: '1234',
      role: 'user',
      referralCode: 'ALKSb23da',
    },
    {
      firstName: 'client',
      lastName: 'no.8',
      phone: '1234567898',
      password: '1234',
      role: 'user',
      referralCode: '3ffe33',
    },
    {
      firstName: 'client',
      lastName: 'no.9',
      phone: '1234567899',
      password: '1234',
      role: 'user',
      referralCode: '3Fad3',
    },
    {
      firstName: 'client',
      lastName: 'no.10',
      phone: '1234567890',
      password: '1234',
      role: 'user',
      referralCode: 'Fas3gad3',
    },
    {
      firstName: 'Abdaelrahman',
      lastName: 'Abdelfattah',
      phone: '01000262238',
      password: '1234',
      role: 'user',
      referralCode: 'nb4nba32r',
    },
  ];

  private readonly admin = [
    {
      firstName: 'admin',
      lastName: 'no.1',
      phone: '01234567890',
      password: '1234',
      role: 'admin',
    },
    {
      firstName: 'admin',
      lastName: 'no.2',
      phone: '01234567891',
      password: '1234',
      role: 'admin',
    },
    {
      firstName: 'admin',
      lastName: 'no.3',
      phone: '01234567892',
      password: '1234',
      role: 'admin',
    },
  ];

  private readonly barbers1 = [
    {
      firstName: 'barber',
      lastName: 'no.1',
      phone: '11234567891',
      avatar:
        'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/avatars/OVt169-1739648179879-freepik__the-style-is-candid-image-photography-with-natural__47103.jpg',
      password: '1234',
      role: 'barber',
    },
    {
      firstName: 'barber',
      lastName: 'no.2',
      phone: '11234567892',
      avatar:
        'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/avatars/OVt169-1739648179879-freepik__the-style-is-candid-image-photography-with-natural__47103.jpg',
      password: '1234',
      role: 'barber',
    },
    {
      firstName: 'barber',
      lastName: 'no.3',
      phone: '11234567893',
      avatar:
        'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/avatars/OVt169-1739648179879-freepik__the-style-is-candid-image-photography-with-natural__47103.jpg',
      password: '1234',
      role: 'barber',
    },
  ];

  private readonly barbers2 = [
    {
      firstName: 'barber',
      lastName: 'no.1',
      phone: '21234567891',
      avatar:
        'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/branches/branch-3.jpg',
      password: '1234',
      role: 'barber',
    },
    {
      firstName: 'barber',
      lastName: 'no.2',
      phone: '21234567892',
      avatar:
        'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/branches/branch-3.jpg',
      password: '1234',
      role: 'barber',
    },
    {
      firstName: 'barber',
      lastName: 'no.3',
      phone: '21234567893',
      avatar:
        'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/branches/branch-3.jpg',
      password: '1234',
      role: 'barber',
    },
  ];

  private readonly barbers3 = [
    {
      firstName: 'barber',
      lastName: 'no.1',
      phone: '31234567891',
      avatar:
        'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/branches/branch-3.jpg',
      password: '1234',
      role: 'barber',
    },
    {
      firstName: 'barber',
      lastName: 'no.2',
      phone: '31234567892',
      avatar:
        'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/branches/branch-3.jpg',
      password: '1234',
      role: 'barber',
    },
    {
      firstName: 'barber',
      lastName: 'no.3',
      phone: '31234567893',
      avatar:
        'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/branches/branch-3.jpg',
      password: '1234',
      role: 'barber',
    },
  ];

  private readonly branches = [
    {
      name: 'Al Rehab',
      location: 'Al Rehab',
      phone: '123456789',
      branchImg:
        'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/branches/branch-1.jpg',
    },
    {
      name: 'Madinaty',
      location: 'Madinaty',
      phone: '123456789',
      branchImg:
        'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/branches/branch-2.jpg',
    },
    {
      name: 'Future City',
      location: 'Future City',
      phone: '123456789',
      branchImg:
        'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/branches/branch-3.jpg',
    },
  ];

  private readonly categories = [
    { name: 'HairCare' },
    { name: 'Beard' },
    { name: 'HairCut' },
  ];

  private readonly BeardServices = [
    {
      name: 'Beard Extra',
      price: 100,
      duration: 1,
      serviceImg:
        'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/services/Beard-Extra.jpg',
    },
    {
      name: 'Beard razor',
      price: 200,
      duration: 2,
      serviceImg:
        'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/services/Beard-Razor.jpg',
    },
    {
      name: 'Beard Straightening',
      price: 300,
      duration: 3,
      serviceImg:
        'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/services/Beard-Straighteing.jpg',
    },
  ];

  private readonly HairCutServices = [
    {
      name: 'Haircut',
      price: 100,
      duration: 1,
      serviceImg:
        'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/services/Hair-Cut.jpg',
    },
    {
      name: 'Zero Cut',
      price: 200,
      duration: 2,
      serviceImg:
        'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/services/Zero-Cut.jpg',
    },
    {
      name: 'Long Hair',
      price: 300,
      duration: 3,
      serviceImg:
        'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/services/Long-Hair.jpg',
    },
  ];

  private readonly HairCareServices = [
    {
      name: 'Hair Dye',
      price: 100,
      duration: 1,
      serviceImg:
        'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/services/Hair-Dye.jpg',
    },
    {
      name: 'Hair Relaxer',
      price: 200,
      duration: 2,
      serviceImg:
        'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/services/Hair-Relaxer.jpg',
    },
    {
      name: 'Hair Protein',
      price: 300,
      duration: 3,
      serviceImg:
        'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/services/Protein.jpg',
    },
  ];

  async createMockClientData() {
    await this.prisma.branch.deleteMany();
    await this.prisma.client.deleteMany();
    await this.prisma.admin.deleteMany();
    await this.prisma.barber.deleteMany();
    await this.prisma.cashier.deleteMany();
    await this.prisma.user.deleteMany();
    await this.prisma.service.deleteMany();
    await this.prisma.category.deleteMany();

    const client = this.clients.map(async (client) => {
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

    const admins = this.admin.map(async (admin) => {
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

    const branchPromises = this.branches.map(async (branch) => {
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

    const barber1 = this.barbers1.map(async (barber) => {
      await this.prisma.user.create({
        data: {
          firstName: barber.firstName,
          lastName: barber.lastName,
          password: await hash(barber.password, 10),
          phone: barber.phone,
          role: Role[barber.role.toUpperCase()],
          avatar: barber.avatar,
          barber: {
            create: {
              branchId: createdBranches[0].id,
            },
          },
        },
      });
    });
    const barber2 = this.barbers2.map(async (barber) => {
      await this.prisma.user.create({
        data: {
          firstName: barber.firstName,
          lastName: barber.lastName,
          password: await hash(barber.password, 10),
          phone: barber.phone,
          role: Role[barber.role.toUpperCase()],
          avatar: barber.avatar,
          barber: {
            create: {
              branchId: createdBranches[1].id,
            },
          },
        },
      });
    });
    const barber3 = this.barbers3.map(async (barber) => {
      await this.prisma.user.create({
        data: {
          firstName: barber.firstName,
          lastName: barber.lastName,
          password: await hash(barber.password, 10),
          phone: barber.phone,
          role: Role[barber.role.toUpperCase()],
          avatar: barber.avatar,
          barber: {
            create: {
              branchId: createdBranches[2].id,
            },
          },
        },
      });
    });

    const category = this.categories.map(async (category) => {
      const c = await this.prisma.category.create({
        data: {
          name: category.name,
        },
      });
      return c;
    });
    const createdCategories = await Promise.all(category);

    const serviceBeard = this.BeardServices.map(async (service) => {
      await this.prisma.service.create({
        data: {
          name: service.name,
          price: service.price,
          duration: service.duration,
          categoryId: createdCategories[1].id,
        },
      });
    });
    const serviceCare = this.HairCareServices.map(async (service) => {
      await this.prisma.service.create({
        data: {
          name: service.name,
          price: service.price,
          duration: service.duration,
          categoryId: createdCategories[0].id,
        },
      });
    });
    const serviceCut = this.HairCutServices.map(async (service) => {
      await this.prisma.service.create({
        data: {
          name: service.name,
          price: service.price,
          duration: service.duration,
          categoryId: createdCategories[2].id,
        },
      });
    });

    const promise = await Promise.all([
      ...client,
      ...admins,
      ...barber1,
      ...barber3,
      ...barber2,
    ]);

    return {
      promise,
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
