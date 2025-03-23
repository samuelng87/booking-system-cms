// Insert a new admin record
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function insertAdmin() {
  try {
    // Create a new admin with the specified data
    const newAdmin = await prisma.admin.create({
      data: {
        name: "samuel"
      }
    });
    
    console.log('Admin record created successfully:');
    console.log(newAdmin);
    
    // Verify by fetching all records
    const allAdmins = await prisma.admin.findMany();
    console.log('All admin records:');
    console.log(allAdmins);
    
    return { success: true, data: newAdmin };
  } catch (error) {
    console.error('Failed to create admin record:');
    console.error(error);
    return { success: false, error };
  } finally {
    await prisma.$disconnect();
  }
}

insertAdmin()
  .then(result => {
    if (result.success) {
      console.log('Admin insertion completed successfully');
    } else {
      console.log('Admin insertion failed');
    }
  })
  .catch(console.error); 