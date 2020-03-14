import {DefaultCrudRepository} from '@loopback/repository';
import {Rate, RateRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RateRepository extends DefaultCrudRepository<
  Rate,
  typeof Rate.prototype.id,
  RateRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Rate, dataSource);
  }
}
