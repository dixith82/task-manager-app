import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create demo user
  const hashedPassword = await bcrypt.hash("Demo@123", 10);
  
  const demoUser = await prisma.user.upsert({
    where: { email: "demo@test.com" },
    update: {},
    create: {
      email: "demo@test.com",
      password: hashedPassword,
      name: "Demo User",
    },
  });

  console.log(`✅ Created demo user: ${demoUser.email}`);

  // Create sample tasks
  const tasks = [
    {
      title: "Complete internship assignment",
      description: "Build a task manager app with auth and dashboard",
      status: "in_progress",
      priority: "high",
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      userId: demoUser.id,
    },
    {
      title: "Learn Next.js 14",
      description: "Study App Router and Server Components",
      status: "pending",
      priority: "medium",
      userId: demoUser.id,
    },
    {
      title: "Prepare for interview",
      description: "Review React hooks and state management",
      status: "completed",
      priority: "high",
      userId: demoUser.id,
    },
    {
      title: "Fix responsive design issues",
      description: "Make dashboard mobile-friendly",
      status: "pending",
      priority: "low",
      userId: demoUser.id,
    },
  ];

  for (const task of tasks) {
    await prisma.task.create({
      data: task,
    });
  }

  console.log(`✅ Created ${tasks.length} sample tasks`);
  
  // Create additional test user
  const testUserPassword = await bcrypt.hash("User@123", 10);
  const testUser = await prisma.user.upsert({
    where: { email: "user@test.com" },
    update: {},
    create: {
      email: "user@test.com",
      password: testUserPassword,
      name: "Test User",
    },
  });

  console.log(`✅ Created test user: ${testUser.email}`);
  console.log("🎉 Seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
