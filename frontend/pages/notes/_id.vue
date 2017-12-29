<template>
  <section>
    <h1>タオル</h1>
        <p>{{ note.title }}</p>
        <p>{{ note.content }}</p>

  </section>

</template>

<script>
  import axios from 'axios'

  export default {
    async asyncData ({params}) {
      console.log(params)
      const { data: note } = await axios.get(`http://localhost:3001/notes/${params.id}`)
      return {
        note
      }
    }
  }
</script>
