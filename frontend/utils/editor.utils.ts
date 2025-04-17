export const getTinyMCEConfig = () => {
  return {
    height: 500,
    width: '100%',
    language: 'vi',
    placeholder: 'Nhập nội dung chi tiết...',
    menubar: 'file edit view insert format tools table help',
    toolbar_mode: 'floating',
    plugins: `
      preview importcss searchreplace autolink autosave save directionality
      code visualblocks visualchars fullscreen image link media template
      codesample table charmap hr pagebreak nonbreaking anchor toc
      insertdatetime advlist lists wordcount imagetools textpattern
      noneditable help charmap quickbars emoticons
    `,
    toolbar: `
      undo redo | formatselect fontselect fontsizeselect | 
      bold italic underline strikethrough forecolor backcolor | 
      link image media codesample table blockquote | 
      alignleft aligncenter alignright alignjustify | 
      outdent indent | numlist bullist | 
      removeformat code fullscreen preview
    `,
    codesample_languages: [
      { text: 'HTML/XML', value: 'markup' },
      { text: 'JavaScript', value: 'javascript' },
      { text: 'TypeScript', value: 'typescript' },
      { text: 'CSS', value: 'css' },
      { text: 'PHP', value: 'php' },
      { text: 'Python', value: 'python' },
      { text: 'Java', value: 'java' },
      { text: 'C#', value: 'csharp' },
      { text: 'C++', value: 'cpp' }
    ],
    content_style: 'body { font-family:Arial,sans-serif; font-size:14px }',
    tinycomments_mode: 'embedded',
    tinycomments_author: 'User',
    automatic_uploads: true,
    file_picker_types: 'image media',
  };
};

export const getTinyMCEScriptSrc = () => {
  return '/tinymce/js/tinymce/tinymce.min.js';
};
