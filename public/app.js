new Vue({
  el: '#app',
  data() {
    return {
      isDark: true,
      show: true,
      todoTitle: '',
      todos: []
    }
  },
  created() {
    const query = `
      query {
        getTodos { 
          id
          title
          done
          createdAt
          updatedAt
        }
      }
    `

    fetch('/graphql', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({query})
    })
      .then(res => res.json())
      .then(response => {
      this.todos = response.data.getTodos
      })
  },
  methods: {
    addTodo() {
      const title = this.todoTitle.trim()
      if (!title) {
        return
      }

      const query = `
        mutation {
          createTodo(todo:{title: "${title}"}) {
            title id createdAt done updatedAt
          }
        }
      `

      fetch('/graphql', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({query})
      })
      .then(res => res.json())
      .then(response => {
        this.todos.push(response.data.createTodo)
        this.todoTitle = ''
      })
      .catch(e => console.log(e))
      this.todoTitle = ''
    },
    removeTodo(id) {
      const query = `
        mutation {
          deleteTodo(id: "${id}")
        }
      `

      fetch('/graphql', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({query})
      })
      .then(res => res.json())
      .then(response => {
        if (response.data.deleteTodo) {
          this.todos = this.todos.filter(t => t.id !== id)
        }
      })
    },
    completeTodo(id) {
      const query = `
        mutation {
          completeTodo(id: ${id}) {
            title id createdAt done updatedAt
          }
        }
      `

      fetch('/graphql', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({query})
      })
      .then(res => res.json())
      .then(response => {
        const todo = response.data.completeTodo

        const idx = this.todos.findIndex(t => t.id === todo.id)
        this.todos[idx].updatedAt = todo.updatedAt
      })
      .catch(e => console.log(e))

    }
  },
  filters: {
    capitalize(value) {
      return value.toString().charAt(0).toUpperCase() + value.slice(1)
    },
    date(value, withTime) {
      const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
      }
      if (withTime) {
        options.hour = '2-digit'
        options.minute = '2-digit'
        options.second = '2-digit'
      }
      return new Intl.DateTimeFormat('ru-RU', options).format(new Date(+value))
    }
  }
})