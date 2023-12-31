"use client";

import { query } from "@/lib/db";
import { useRef, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
// import { useRouter } from 'next/router'

const AddNewPost = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  // const router = useRouter()


  let useDarkMode = false;

  //   useEffect(() => {
  //     useDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  //   }, []);

  const editorRef = useRef(null);

  //   const log = () => {
  //     if (editorRef.current) {
  //       console.log(editorRef.current.getContent());
  //     }
  //   };

  const onSubmitHandler = async () => {
    // e.preventDefault();

    const data = {
      title,
      tags,
      long_text: editorRef.current.getContent(),
    };

    await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // const data1 = await resposne.json()

    // if (resposne.ok) 


    setTitle("");
    setTags("");

   
  };

  return (
    <>
      <br />
      <form>
        <label htmlFor="title">Tytuł:</label> <br />
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
        <br /> <br />
        <label htmlFor="tags">Tagi:</label> <br />
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />{" "}
        <br /> <br /> <br />
        <Editor
          apiKey="ucnina6ztigd8ixypgyrdi0qn696kig5a09an91hf7c2wiaj"
          id="ucnina6ztigd8ixypgyrdi0qn696kig5a09an91hf7c2wiaj"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            selector: "textarea#open-source-plugins",
            plugins: [ "image", "code", "table", "link", "media", "codesample"],
            imagetools_cors_hosts: ["picsum.photos"],
            menubar: "file edit view insert format tools table help",
            toolbar:
              "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
            toolbar_sticky: true,
            autosave_ask_before_unload: false,
            autosave_interval: "30s",
            autosave_prefix: "{path}{query}-{id}-",
            autosave_restore_when_empty: false,
            autosave_retention: "2m",
            image_advtab: true,
            importcss_append: true,
            file_picker_callback: function (callback, value, meta) {
              /* Provide file and text for the link dialog */
              if (meta.filetype === "file") {
                callback("https://www.google.com/logos/google.jpg", {
                  text: "My text",
                });
              }

              /* Provide image and alt text for the image dialog */
              if (meta.filetype === "image") {
                callback("https://www.google.com/logos/google.jpg", {
                  alt: "My alt text",
                });
              }

              /* Provide alternative source and posted for the media dialog */
              if (meta.filetype === "media") {
                callback("movie.mp4", {
                  source2: "alt.ogg",
                  poster: "https://www.google.com/logos/google.jpg",
                });
              }
            },
            templates: [
              {
                title: "New Table",
                description: "creates a new table",
                content:
                  '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
              },
              {
                title: "Starting my story",
                description: "A cure for writers block",
                content: "Once upon a time...",
              },
              {
                title: "New list with dates",
                description: "New List with dates",
                content:
                  '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
              },
            ],
            template_cdate_format:
              "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
            template_mdate_format:
              "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
            height: 600,
            image_caption: true,
            quickbars_selection_toolbar:
              "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
            noneditable_noneditable_class: "mceNonEditable",
            toolbar_mode: "sliding",
            contextmenu: "link image imagetools table",
            skin: useDarkMode ? "oxide-dark" : "oxide",
            content_css: useDarkMode ? "dark" : "default",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        <button type="submit" onClick={onSubmitHandler}>
          Add note
        </button>
      </form>
    </>
  );
};

export default AddNewPost;
