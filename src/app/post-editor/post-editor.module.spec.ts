import { PostEditorModule } from '@app/post-editor/post-editor.module';

describe('PostEditorModule', () => {
  let postEditorModule: PostEditorModule;

  beforeEach(() => {
    postEditorModule = new PostEditorModule();
  });

  it('should create an instance', () => {
    expect(postEditorModule).toBeTruthy();
  });
});
