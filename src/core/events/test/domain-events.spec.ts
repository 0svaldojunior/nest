import { AggregateRoot } from '@/core/entities/aggregate-root'
import { DomainEvent } from '../domain-event'
import { DomainEvents } from '../domain-events'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { vi } from 'vitest'

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  private aggregate: CustomAggregate // eslint-disable-line

  constructor(aggregate: CustomAggregate) {
    this.ocurredAt = new Date()
    this.aggregate = aggregate
  }

  public getAggregateId(): UniqueEntityID {
    return this.aggregate.id
  }
}

class CustomAggregate extends AggregateRoot<unknown> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}

describe('Domain Events', () => {
  it('should be able to dispatch and listen to events', () => {
    const callbackSpy = vi.fn()

    // Subscriber created (listening event "create answer")
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name) // notification domain event

    // Create the answer, but don't save on database
    const aggregate = CustomAggregate.create() // forum domain event

    // Test this event is started but not dispatched
    expect(aggregate.domainEvents.length).toBe(1)

    // Save the answer on database and dispatch the event
    DomainEvents.dispatchEventsForAggregate(aggregate.id) // forum subdomain event

    // The subscriber should be called and the event should be removed from the aggregate
    expect(callbackSpy).toBeCalledTimes(1)
    // The subscriber should be called with the aggregate
    expect(aggregate.domainEvents.length).toBe(0)
  })
})
