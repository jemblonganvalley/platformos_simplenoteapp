# Starting create a simple project on the platform os

## Target :

- [x]  Create Simple UI
- [x]  Create Content Table
- [x]  Insert data to the table
- [x]  show data in pos-cli gui
- [ ]  render data to html
- [ ]  delete data
- [ ]  implementation data search

## Environment setup

I make a folder call simple note app on my machine

```bash
mkdir simplenoteapp
```

and then I use **pos-cli** to generate a basic project

```bash
pos-cli init
```

Platform os will generate a basic folder structure for me.

## Create an Instance

To start developing in platform os I need to create an instance at [https://partners.platformos.com/](https://partners.platformos.com/)

first, I register into the partner platform os and log in with my google account.

Now I can see platform os partners dashboard, go to the instance menu and create a new instance

![Screen Shot 2022-05-23 at 11.06.11.png](Starting%20create%20a%20simple%20project%20on%20the%20platform%20o%201893c963e75a4bf0aeca533eac3524d6/Screen_Shot_2022-05-23_at_11.06.11.png)

Then, I can add the environment to my instance.

```bash
pos-cli env add stagging \
  --url [my instance url] \
  --email [my email]
```

For testing sync, I change a little bit of code and run

```bash
pos-cli sync stagging --livereload
```

And now, every change I made in the file, shows in the instance URL immediately.

## Design

Before I code in frontend, I create the design first, with Figma,

you can show it [here](https://www.figma.com/proto/dTThi1TBjkXyBp3XCsB1XB/richard-task?node-id=1%3A2&scaling=scale-down&page-id=0%3A1&starting-point-node-id=1%3A2&hide-ui=1) 

![Screen Shot 2022-05-23 at 11.34.52.png](Starting%20create%20a%20simple%20project%20on%20the%20platform%20o%201893c963e75a4bf0aeca533eac3524d6/Screen_Shot_2022-05-23_at_11.34.52.png)

My plan is to use Tailwind CSS in the front end to speed up the layout process.

## Start Frontend code

The first time I can find a file called **application.html.liquid**, this is the main layout file for the whole page.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    {% include 'layout/head' %}
  </head>

  <body class="antialiased font-sans leading-relaxed overflow-x-hidden">

    {{ content_for_layout }}

    <script src="{{ 'scripts/vendor.js' | asset_url }}"></script>
    <script src="{{ 'scripts/app.js' | asset_url }}"></script>
  </body>
</html>
```

I can see here layout is split into any partial files. And I open head.liquid file, and add any cdn link, 

for icons and tailwind css.

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta content="authenticity_token" name="csrf-param">
<meta content="{{ form_authenticity_token }}" name="csrf-token">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>{{ page.metadata.title }}</title>
<meta name="description" content="{{ page.metadata.description }}">
<script src="https://cdn.tailwindcss.com"></script>
<link rel="stylesheet" href="{{ 'styles/app.css' | asset_url }}">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
```

*I know is not best practice to use tailwind with CDN, but I think for this project my focus is not on CSS, but on learning more about the platform os.*

## Main content

I start to create a note add button and search input field, as shown below.

![Screen Shot 2022-05-23 at 11.59.51.png](Starting%20create%20a%20simple%20project%20on%20the%20platform%20o%201893c963e75a4bf0aeca533eac3524d6/Screen_Shot_2022-05-23_at_11.59.51.png)

*views/page/index.html.liquid*

```html
---
metadata:
  title: "Simple Note App"
  description: "Simple Note App"
  tags: ["add note", "noteapp", "note"]
---

<!-- MAIN CONTENT -->
<div class="w-screen min-h-screen flex flex-col p-10 bg-slate-100">
  <header class="flex w-full justify-center">
    <div class="w-[600px] flex items-center gap-2">
      <button
        class="h-12 px-4 bg-yellow-300 text-gray-800 rounded-md capitalize hover:bg-yellow-400"
        id="add_button"
        onclick="handleShowAddModal()"
      >
        add note
      </button>
      <form class="w-full flex-1">
        <div class="flex relative">
          <input
            type="text"
            placeholder="Search Note Here.."
            class="h-12 px-4 border-[1px] border-gray-300 rounded-md outline-none appearance-none w-full"
          />
          <i
            class="material-icons absolute self-center right-2 text-gray-300 select-none cursor-pointer"
            >search</i
          >
        </div>
      </form>
    </div>
  </header>
</div>
<!-- END MAIN CONTENT -->
```

Next, I create a modal for inputting note data.

*views/page/index.html.liquid*

```html
<!-- ADD MODAL -->
<div
  class="flex flex-col justify-center items-center bg-black/50 fixed top-0 left-0 z-[200] w-screen h-screen"
  style="display: none"
  id="add_modal"
>
  <form class="w-[300px]">
    <input
      type="text"
      class="h-12 px-4 border-none outline-none w-full bg-yellow-200"
      placeholder="write title here.."
      name="title"
      id="title"
      required
    />
    <textarea
      name="description"
      id="description"
      class="w-full min-h-[300px] p-4 bg-yellow-200 text-gray-500 outline-none"
      placeholder="write note here"
      required
    ></textarea>

    <div class="w-full flex gap-2 mt-4 p-4">
      <button
        class="h-12 bg-gray-300 text-gray-500 flex-1 capitalize rounded-md"
        type="button"
        onclick="handleShowAddModal()"
      >
        cancel
      </button>

      <button class="h-12 bg-green-500 text-white flex-1 capitalize rounded-md">
        save
      </button>
    </div>
  </form>
</div>
<!-- END ADD MODAL -->
```

*The code looks messy when using tailwind class, next time I will separate CSS file.*

To show and hide the modal, I create a simple function in embedded javascript in same file

```html
<script>
  const handleShowAddModal = () => {
    let btn_show_modal = document.getElementById("add_button");
    let add_modal = document.getElementById("add_modal");

    if (add_modal.style.display == "none") {
      return (add_modal.style.display = "flex");
    }

    add_modal.style.display = "none";
  };
</script>
```

handleShowModal called in two buttons, the add_note button, and the cancel button.

![Screen Shot 2022-05-23 at 12.26.23.png](Starting%20create%20a%20simple%20project%20on%20the%20platform%20o%201893c963e75a4bf0aeca533eac3524d6/Screen_Shot_2022-05-23_at_12.26.23.png)

## Create yml schema

Okay, I move to create a schema, I create **content.yml** file in *model_schema* folder.

```html
name: "content"
properties:
  - name: "title"
    type: "string"
  - name: "description"
    type: "string"
```

When I save the file, pos-cli sync immediately shows this message in the terminal.

```bash
[Sync] WARNING: Data schema was updated. It will take a while for the change to be applied.
[Sync] Synced: model_schemas/content.yml
```

After that, I need to create a graphql file in the graphql folder, to store my data 

*graphql/content/create.graphql*

```bash
mutation create($title: String!, $description: String!) {
  record_create(
    record: {
      table: "content"
      properties: [
        { name: "title", value: $title }
        { name: "description", value: $description }
      ]
    }
  ) {
    id
  }
}
```

*if the response succeeds, that will return the id of the new record*

Before I test to store in the database, I need to test the form I made,

I created a file called create.liquid on views/pages/api/content

*views/pags/api/content/create.liquid*

```bash
---
method: post
---

{%liquid 
	assign title = context.params.title 
	assign content = context.params.content 
%}

{{ title }}
{{ content }}
```

I try to check context data requests, by show context data on the page

And I need to change the form attribute on index.html.liquid file

*views/page/index.html.liquid*

```html
...
<form class="w-[300px]" action="/api/content/create" method="post">
...
```

 Yeay I get the request query params

![Screen Shot 2022-05-23 at 12.56.21.png](Starting%20create%20a%20simple%20project%20on%20the%20platform%20o%201893c963e75a4bf0aeca533eac3524d6/Screen_Shot_2022-05-23_at_12.56.21.png)

## Input data to the table

For input data to the table, I need to change little code in *views/pages/api/content/create.liquid*

```html
---
    method: post
---

{%liquid 
    assign title = context.params.title 
    assign description = context.params.description 
    graphql result = "content/create", title : title, description : description 
    assign res = result | fetch: "record_create"
%}

{% if res.id %}
    <script>
        alert("Success add data")
        window.location.href = "/"
    </script>
{% else %}
    <script>
        alert("{{result.errors.message}}")
        // window.location.href = "/"
    </script>

    {{result.errors}}
{% endif %}
```

I add graphql type in variable call result, and connect to “content/create”, that's because I take file called to create.graphql in graphql/content folder.

And then insert title and description variable into req params

```html
...
graphql result = "content/create", title : title, description : description 
...

```

Next, I create a variable called **res** which contains the response body.

```html
...
assign res = result | fetch: "record_create"
...
```

And then with the res variable, I can check if the response return id

```html
...
{% if res.id %}
    <script>
        alert("Success add data")
        window.location.href = "/"
    </script>
{% else %}
    <script>
        alert("{{result.errors.message}}")
        // window.location.href = "/"
    </script>

    {{result.errors}}
{% endif %}

```

![Screen Shot 2022-05-23 at 14.16.00.png](Starting%20create%20a%20simple%20project%20on%20the%20platform%20o%201893c963e75a4bf0aeca533eac3524d6/Screen_Shot_2022-05-23_at_14.16.00.png)

Yeah I, succeeded in adding new data to the content table,

## Preview data in Pos-cli GUI

For check data, I use pos-cli GUI

```html
pos-cli gui serve stagging
```

![Screen Shot 2022-05-23 at 14.27.16.png](Starting%20create%20a%20simple%20project%20on%20the%20platform%20o%201893c963e75a4bf0aeca533eac3524d6/Screen_Shot_2022-05-23_at_14.27.16.png)

Now I can open my localhost with port 3333, and go to model section,

![Screen Shot 2022-05-23 at 14.29.24.png](Starting%20create%20a%20simple%20project%20on%20the%20platform%20o%201893c963e75a4bf0aeca533eac3524d6/Screen_Shot_2022-05-23_at_14.29.24.png)

My last record shown here.

*To be continue…*