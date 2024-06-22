// src/components/CkEditor.tsx
import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CkEditor: React.FC = () => {
  const [editorData, setEditorData] = useState<string>('');
  return (
    <div>
      <CKEditor 
        editor={ClassicEditor}
        data="<p>Type your content here!</p>"
         // Sử dụng đối tượng cấu hình

        onReady={(editor: any) => {
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event: any, editor: any) => {
          const data = editor.getData();
          setEditorData(data);
          console.log({ event, editor, data });
        }}
        onBlur={(event: any, editor: any) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event: any, editor: any) => {
          console.log('Focus.', editor);
        }}
      />
      {/* <div>
        <h3>Content</h3>
        <div>{editorData}</div>
      </div> */}
    </div>
  );
};

export default CkEditor;
