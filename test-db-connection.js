// Test MongoDB connection using Prisma
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    // Attempt to query the admin model
    const adminCount = await prisma.admin.count();
    console.log('Connection successful!');
    console.log(`Number of admin records: ${adminCount}`);
    
    // Fetch all admin records
    const admins = await prisma.admin.findMany();
    console.log('Admin records:');
    console.log(admins);
    
    return { success: true, data: admins };
  } catch (error) {
    console.error('Connection failed:');
    console.error(error);
    return { success: false, error };
  } finally {
    await prisma.$disconnect();
  }
}

testConnection()
  .then(result => {
    if (result.success) {
      console.log('Database test completed successfully');
    } else {
      console.log('Database test failed');
    }
  })
  .catch(console.error); 