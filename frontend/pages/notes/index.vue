<template>
  <section>
    <h1>タオル</h1>
    <ul>
      <li v-for="note in notes">
        {{ note.title }}
        {{ note.content }}
      </li>
    </ul>
  </section>

</template>

<script>
  import axios from 'axios'

  export default {
    async asyncData () {
      const { data: notes } = await axios.get('http://localhost:3001/notes')
      return {
        notes
      }
    }
  }
</script>
