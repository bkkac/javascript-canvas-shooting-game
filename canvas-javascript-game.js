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
                // c.closePath()
        }

        update() {
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y
        }
    }


    const x = canvas.width / 2
    const y = canvas.height / 2

    const player = new Player(x, y, 30, 'blue');


    // const projectile = new Projectile(
    //     canvas.width / 2,
    //     canvas.height / 2,
    //     5,
    //     'red', {
    //         x: 1,
    //         y: 1
    //     });

    /* multiple projectiles */
    const projectiles = [];

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
    }
    addEventListener('click', (event) => {
        console.log('projectile shot!')
            // const projectile = new Projectile(event.clientX, event.clientY, 5, 'red', {
            //     x: 1,
            //     y: 1
            // });
            // projectile.draw();
            // projectile.update();

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
            //  {
            //     x: 1,
            //     y: 1
            // }
            velocity
        ))
    })


    animate();
})