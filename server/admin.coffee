module.exports = [
    { url: /^\/users$/gi,           methods: ['get', 'post'] }
    { url: /^\/users\/[0-9a-f]$/gi, methods: ['get', 'put', 'delete'] }
]