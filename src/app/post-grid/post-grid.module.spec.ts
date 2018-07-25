import { PostGridModule } from '@app/post-grid/post-grid.module';

describe('PostGridModule', () => {
  let postGridModule: PostGridModule;

  beforeEach(() => {
    postGridModule = new PostGridModule();
  });

  it('should create an instance', () => {
    expect(postGridModule).toBeTruthy();
  });
});
