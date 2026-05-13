import { Service } from "./Service.js";
import { Resource } from "./Resource.js";
import { ResourceBookingSystem } from "./ResourceBookingSystem.js";


function runExample() {
  console.log("=== Resource Booking System Example ===\n");

  const meetingRoomService = new Service("hourly", 30, 10);

  const meetingRoom = new Resource("Meeting Room A", 10, [meetingRoomService]);

  const system = new ResourceBookingSystem();
  system.addResource(meetingRoom);

  const startResult = system.requestUsage("Meeting Room A", "user123", "hourly");
  console.log("Start Usage:", startResult);

  const session = startResult.session;
  session.startTime = new Date("2026-05-13T10:00:00");


  setTimeout(() => {
    const activeSession = meetingRoom.usageSessions.find(s => s.userId === "user123");
    activeSession.endTime = new Date("2026-05-13T11:20:00");
    meetingRoom.currentUsers--;

    const bill = meetingRoom.calculateBill(activeSession);
    
    console.log("\n=== Billing Details ===");
    console.log(`User: ${bill.userId}`);
    console.log(`Resource: ${bill.resourceName}`);
    console.log(`Start Time: ${bill.startTime.toLocaleTimeString()}`);
    console.log(`End Time: ${bill.endTime.toLocaleTimeString()}`);
    console.log(`Total Duration: ${bill.durationMinutes} minutes (${bill.durationHours} hours)`);
    console.log(`Billing Hours (rounded up): ${bill.billingHours} hours`);
    console.log(`First Hour Cost: ₹${bill.firstHourCost}`);
    console.log(`Additional Hour Cost: ₹${bill.additionalHourCost}`);
    console.log(`Total Bill: ₹${bill.totalCost}`);
    
    console.log("\n=== Calculation Breakdown ===");
    console.log(`- Duration: 1 hour and 20 minutes`);
    console.log(`- Rounded up to: 2 hours for billing`);
    console.log(`- First hour: ₹30`);
    console.log(`- Additional 1 hour: ₹10`);
    console.log(`- Total: ₹40`);
  }, 100);
}

runExample();

