import { Service } from "./Service.js";

class Resource {
  constructor(name, capacity, services) {
    this.name = name;
    this.capacity = capacity;
    this.services = services;
    this.currentUsers = 0;
    this.usageSessions = [];
  }

  isAvailable() {
    return this.currentUsers < this.capacity;
  }

  startUsage(userId, serviceType) {
    if (!this.isAvailable()) {
      return {
        success: false,
        message: "Resource is fully occupied. Request rejected.",
      };
    }

    const session = {
      userId,
      serviceType,
      startTime: new Date(),
      endTime: null,
    };

    this.usageSessions.push(session);
    this.currentUsers++;

    return {
      success: true,
      message: "Usage started successfully",
      session,
    };
  }

  stopUsage(userId) {
    const sessionIndex = this.usageSessions.findIndex(
      (s) => s.userId === userId && s.endTime === null,
    );

    if (sessionIndex === -1) {
      return {
        success: false,
        message: "No active session found for this user",
      };
    }

    const session = this.usageSessions[sessionIndex];
    session.endTime = new Date();
    this.currentUsers--;

    const bill = this.calculateBill(session);

    return {
      success: true,
      message: "Usage stopped successfully",
      session,
      bill,
    };
  }

  calculateBill(session) {
    const service = this.services.find((s) => s.type === session.serviceType);

    if (!service) {
      throw new Error("Service not found");
    }

    const durationMs = session.endTime - session.startTime;
    const durationHours = durationMs / (1000 * 60 * 60);

    const billingHours = Math.ceil(durationHours);

    let totalCost = service.firstHourCost;

    if (billingHours > 1) {
      totalCost += (billingHours - 1) * service.additionalHourCost;
    }

    return {
      userId: session.userId,
      resourceName: this.name,
      serviceType: session.serviceType,
      startTime: session.startTime,
      endTime: session.endTime,
      durationMinutes: Math.round(durationMs / (1000 * 60)),
      durationHours: durationHours.toFixed(2),
      billingHours,
      firstHourCost: service.firstHourCost,
      additionalHourCost: service.additionalHourCost,
      totalCost,
    };
  }
}

export { Resource };
