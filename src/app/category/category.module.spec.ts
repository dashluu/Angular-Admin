import { CategoryModule } from '@app/category/category.module';

describe('CategoryModule', () => {
  let categoryModule: CategoryModule;

  beforeEach(() => {
    categoryModule = new CategoryModule();
  });

  it('should create an instance', () => {
    expect(categoryModule).toBeTruthy();
  });
});
