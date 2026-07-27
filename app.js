const app = Vue.createApp({
  data() {
    return {
      skeins: [],
      newSkein: { name: '', yards: '', count: '' },
      targetYards: '',
      editingIndex: null,
      editingSkein: { name: '', yards: '', count: '' }
    }
  },

  computed: {
    totalAvailable() {
      return this.skeins.reduce((sum, s) => sum + (s.yards * s.count), 0)
    },

    difference() {
      if (!this.targetYards) return null
      return this.totalAvailable - this.targetYards
    },

    diffDisplay() {
      const d = this.difference
      if (d === null) return '\u2014'
      return d >= 0 ? `+${d}` : `${d}`
    },

    diffColor() {
      const d = this.difference
      if (d === null) return 'var(--color-text-muted)'
      if (d >= 0) return 'var(--color-green)'
      if (d >= -this.targetYards * 0.1) return 'var(--color-yellow)'
      return 'var(--color-red)'
    },

    statusLabel() {
      const d = this.difference
      if (d === null) return ''
      if (d >= 0) return 'Enough yarn'
      if (d >= -this.targetYards * 0.1) return 'Almost enough'
      return 'Need more yarn'
    },

    statusColor() {
      const d = this.difference
      if (d === null) return 'var(--color-text-muted)'
      if (d >= 0) return 'var(--color-green)'
      if (d >= -this.targetYards * 0.1) return 'var(--color-yellow)'
      return 'var(--color-red)'
    },

    resultCardStyle() {
      const d = this.difference
      if (!this.targetYards || this.skeins.length === 0) {
        return {
          backgroundColor: 'var(--color-paper-card)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)'
        }
      }
      if (d >= 0) {
        return { backgroundColor: 'var(--color-green-bg)', borderLeft: '4px solid var(--color-green)' }
      }
      if (d >= -this.targetYards * 0.1) {
        return { backgroundColor: 'var(--color-yellow-bg)', borderLeft: '4px solid var(--color-yellow)' }
      }
      return { backgroundColor: 'var(--color-red-bg)', borderLeft: '4px solid var(--color-red)' }
    },

    inputStyle() {
      return {
        backgroundColor: 'var(--color-paper-card)',
        borderColor: 'var(--color-border)',
        color: 'var(--color-text)'
      }
    }
  },

  methods: {
    addSkein() {
      if (!this.newSkein.name || !this.newSkein.yards || !this.newSkein.count) return
      this.skeins.push({
        name: this.newSkein.name.trim(),
        yards: Number(this.newSkein.yards),
        count: Number(this.newSkein.count)
      })
      this.newSkein = { name: '', yards: '', count: '' }
    },

    startEdit(index) {
      this.editingIndex = index
      this.editingSkein = { ...this.skeins[index] }
    },

    saveEdit(index) {
      if (!this.editingSkein.name || !this.editingSkein.yards || !this.editingSkein.count) return
      this.skeins[index] = { ...this.editingSkein }
      this.cancelEdit()
    },

    cancelEdit() {
      this.editingIndex = null
      this.editingSkein = { name: '', yards: '', count: '' }
    },

    deleteSkein(index) {
      this.skeins.splice(index, 1)
      if (this.editingIndex === index) this.cancelEdit()
    }
  }
})

app.mount('#app')
