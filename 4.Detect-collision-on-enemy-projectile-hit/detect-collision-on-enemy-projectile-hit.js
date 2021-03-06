document.addEventListener('DOMContentLoaded', () => {
    var canvas = document.querySelector("canvas");
    const c = canvas.getContext('2d')
    canvas.width = innerWidth
    canvas.height = innerHeight


    console.log(c);

    /* player class */
    class Player {
        constructor(x, y, radius, color) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
        }


        draw() {
            c.beginPath()
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
            c.fillStyle = this.color
            c.fill()
            c.closePath()
        }
    }

    /* projectile class */
    class Projectile {
        constructor(x, y, radius, color, velocity) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.velocity = velocity
        }
        draw() {
            c.beginPath()
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
            c.fillStyle = this.color
            c.fill()
        }
        update() {
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y
        }
    }


    /* Enemy class */
    class Enemy {
        constructor(x, y, radius, color, velocity) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.velocity = velocity
        }
        draw() {
            c.beginPath()
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
            c.fillStyle = this.color
            c.fill()
        }
        update() {
            this.draw()
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y
        }
    }

    const x = canvas.width / 2
    const y = canvas.height / 2

    const player = new Player(x, y, 30, 'blue');

    /* multiple projectiles */
    const projectiles = [];
    /* multiple enemies */
    const enemies = [];


    /* Spawn enemies */
    function spawnEnemies() {
        setInterval(() => {
            // console.log('go!');
            // this.x = x;
            // this.y = y;
            // this.radius = radius;
            // this.color = color;
            // this.velocity = velocity

            // const x = Math.random() * canvas.width;
            // const y = Math.random() * canvas.height;

            // const radius = 30;
            /* radius of different sizes */
            const radius = Math.random() * (30 - 4) + 4

            let x;
            let y;
            if (Math.random() < 0.5) {
                x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
                y = Math.random() * canvas.height;

            } else {
                x = Math.random() * canvas.width;
                y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;

            }
            const color = 'green';
            // const velocity = {
            //     x: 1,
            //     y: 1
            // }
            const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)
            const velocity = {
                x: Math.cos(angle),
                y: Math.sin(angle)
            }
            enemies.push(new Enemy(x, y, radius, color, velocity))
            console.log(enemies)
        }, 1000)
    }

    function animate() {
        requestAnimationFrame(animate);
        // console.log('go!')
        // 
        c.clearRect(0, 0, canvas.width, canvas.height);

        player.draw();
        projectiles.forEach(projectile => {
            projectile.draw();
            projectile.update();
        })

        /* draw enemies */
        enemies.forEach((enemy, index) => {
            enemy.draw()
            enemy.update();

            /* check collision */
            projectiles.forEach((projectile, projectileIndex) => {
                const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
                // object touched
                if (dist - enemy.radius - projectile.radius < 1) {
                    setTimeout(() => {
                        console.log('remove from screen');
                        enemies.splice(index, 1)
                        projectiles.splice(projectileIndex, 1)
                    }, 0)
                }
            })
        })
    }
    addEventListener('click', (event) => {
        console.log('projectile shot!')
        const angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2)
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        projectiles.push(new Projectile(
            canvas.width / 2,
            canvas.height / 2,
            5,
            'red',
            velocity
        ))
    })


    animate();
    spawnEnemies();
})