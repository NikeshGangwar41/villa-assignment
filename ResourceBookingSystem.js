import { Resource } from "./Resource.js";

class ResourceBookingSystem {
  constructor() {
    this.resources = [];
  }

  addResource(resource) {
    this.resources.push(resource);
  }

  getResource(name) {
    return this.resources.find((r) => r.name === name);
  }

  requestUsage(resourceName, userId, serviceType) {
    const resource = this.getResource(resourceName);

    if (!resource) {
      return {
        success: false,
        message: "Resource not found",
      };
    }

    return resource.startUsage(userId, serviceType);
  }

  endUsage(resourceName, userId) {
    const resource = this.getResource(resourceName);

    if (!resource) {
      return {
        success: false,
        message: "Resource not found",
      };
    }

    return resource.stopUsage(userId);
  }

  getResourceStatus(resourceName) {
    const resource = this.getResource(resourceName);

    if (!resource) {
      return null;
    }

    return {
      name: resource.name,
      capacity: resource.capacity,
      currentUsers: resource.currentUsers,
      available: resource.isAvailable(),
      availableSlots: resource.capacity - resource.currentUsers,
    };
  }
}

export { ResourceBookingSystem };
