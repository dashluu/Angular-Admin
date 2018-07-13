import { PostEditorModule } from './post-editor.module';

describe('PostEditorModule', () => {
  let postEditorModule: PostEditorModule;

  beforeEach(() => {
    postEditorModule = new PostEditorModule();
  });

  it('should create an instance', () => {
    expect(postEditorModule).toBeTruthy();
  });
});
