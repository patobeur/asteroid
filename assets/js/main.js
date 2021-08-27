"use strict";
class Asteroid {
	constructor() {
		this.Pause = false;
		this.Bug = false;
		this.actualplayer = 0;
		this.center = { x: (window.innerWidth / 2), y: (window.innerHeight / 2), z: 0 }
		this.screen = { w: window.innerWidth, h: window.innerHeight, l: ((window.innerHeight + window.innerWidth) / 2) }
		// this.screenRatio = {w:1,h:1,l:1}
		// this.cosmos = this.cosmosManager()
		this.players = this.playersManager()
		this.stars = this.starsManager()
		this.projectils = this.projectilsManager()
		this.asteroids = this.asteroidsManager()
		this.proj = () => {
			return this.projectils.length
		}
		this.createAndAddCss()
		this.startGame()



	}
	createAndAddCss = () => {
		let stringcss = 'body {overflow: hidden;font-family: monospace;background-color: #202020;width: 100%;height: 100%;}'
		stringcss += '*,::before,::after {margin: 0;padding: 0;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;-webkit-box-sizing: border-box;box-sizing: border-box;}'
		stringcss += '#devconsole {position: absolute;top: 10px;left: 10px;width: -webkit-max-content;width: -moz-max-content;width: max-content;font-size: 1rem;color: white;}'
		stringcss += '#devmire {position: absolute;background-image: url("assets/img/center_testing_visual_white.svg");background-attachment: fixed;background-size: 256px;background-repeat: no-repeat;background-position: center;width: 256px;height: 256px;top: 50%;left: 50%;transform: translate(-50%, -50%);}'
		stringcss += '.ship.visual {background-image: url(assets/img/ship.svg);background-position: center center;background-size: cover;background-repeat:no-repeat}'
		stringcss += '.asteroid.type-1 {position: absolute;background-image: url("/assets/img/asteroid_1.svg");background-attachment: fixed;background-size: contain;background-repeat: no-repeat;background-position: center;width: 32px;height: 32px;top: 50%;left: 50%;transform: translate(-50%, -50%);}'
		stringcss += '.asteroid.type-2 {position: absolute;background-image: url("/assets/img/asteroid_2.svg");background-attachment: fixed;background-size: contain;background-repeat: no-repeat;background-position: center;width: 48px;height: 48px;top: 50%;left: 50%;transform: translate(-50%, -50%);}'
		stringcss += '.asteroid.type-3 {position: absolute;background-image: url("/assets/img/asteroid_3.svg");background-attachment: fixed;background-size: contain;background-repeat: no-repeat;background-position: center;width: 64px;height: 64px;top: 50%;left: 50%;transform: translate(-50%, -50%);}'
		this.addCss(stringcss, 'main')
	}
	addCss(stringcss, styleid) {
		let style = document.createElement('style');
		style.textContent = stringcss
		style.id = styleid
		document.getElementsByTagName('head')[0].appendChild(style);
	}
	startGame = () => {
		// this.cosmos.addtodom()
		this.stars.create()
		this.stars.add()

		this.players.create()
		this.players.players[this.actualplayer].ships.addtodom()

		this.asteroids.create()

		setInterval(() => { this.render() }, 100);
		this.addeventkey()
	}
	render = () => {
		if (!this.Pause) {
			// PROJECTILS
			this.projectils.renderProjectils()
			// ASTEROIDS
			this.asteroids.renderAsteroids()
			// PLAYERS
			this.players.renderPlayer()
		}
	}
	check_PlayerMoves = (player) => {
		let star = this.stars.stars[0]
		let ship = player.ships.ships[player.currentship]
		// let distance = this.get_distance(player,star)
		let x = ship.x
		let y = ship.y
		let z = ship.z // 3d
		let d = ship.d
		let speed = ship.speed
		// let dRatio = parseInt(d / 360 * 100000) / 100000 // 0.0 to 1

		// 0:'normal', 1:'nogravity', 2:'ia', 3:'orbit', 4:'polar'
		if (ship.mods.move === 0) { // normal move mods
			// to do
			// console.log(d)
			ship.x = ship.x + (speed * Math.cos((d) * (Math.PI / 180)))
			ship.y = ship.y + (speed * Math.sin((d) * (Math.PI / 180)))
		}
		else if (ship.mods.move === 1) { // nogravity ??
			// to do
			ship.x = ship.x + (speed * Math.cos((d) * (Math.PI / 180)))
			ship.y = ship.y + (speed * Math.sin((d) * (Math.PI / 180)))
		}
		else if (ship.mods.move === 2) { // ia
			// to do
		}
		else if (ship.mods.move === 3) { // orbit
			// star center pos
			let starx = star.x + (star.w / 2)
			let stary = star.y + (star.h / 2)
			let starw = star.range.x / 2
			let starh = star.range.y / 2
			let starl = star.range.z / 2 // z-index
			// new pos
			let x2 = 0
			let y2 = 0
			let distance = this.get_distance(player, star)
			if (distance > 0) { // need modification
				x2 = starx + Math.round((distance) * (Math.cos(ship.d * (180 / Math.PI))));
				y2 = stary + Math.round((distance) * (Math.sin(ship.d * (180 / Math.PI))));
				ship.d += 1
			}
			else {
				x2 = starx + Math.round(starw * (Math.cos(ship.d * (180 / Math.PI))));
				y2 = stary + Math.round(starh * (Math.sin(ship.d * (180 / Math.PI))));
				ship.d += 1
			}
			// saving new pos in obj
			ship.x = x2 - (ship.w / 2)
			ship.y = y2 - (ship.h / 2)
			// if(ship.d >360){ship.d=1}
		}
		else if (ship.mods.move === 4) { // polar coordinate 
			if (ship.d === 360 || ship.d === 0) { ship.y -= ship.speed } // N
			if (ship.d === 45) { ship.x += ship.speed; ship.y -= ship.speed } // NE
			if (ship.d === 90) { ship.x += ship.speed; } // E
			if (ship.d === 135) { ship.x += ship.speed; ship.y += ship.speed } // SE
			if (ship.d === 180) { ship.y += ship.speed } // S
			if (ship.d === 225) { ship.x -= ship.speed; ship.y += ship.speed } // SW
			if (ship.d === 270) { ship.x -= ship.speed; } // W
			if (ship.d === 315) { ship.x -= ship.speed; ship.y -= ship.speed } // NW
		}
	}
	starsManager = () => {
		let datas = {
			stars: [],
			add: () => {
				for (let index = 0; index < this.stars.stars.length; index++) {
					this.stars.stars[index].div = this.divmaker('star', this.stars.stars[index]);
					this.stars.addtodom(this.stars.stars[index])
				}
			},
			addtodom: (star) => {
				document.body.appendChild(star.div)
			},
			create: () => {
				let immat = this.stars.stars.lenght ?? 0
				this.stars.stars.push({
					immat: immat,
					type: 'star',
					visual: '🌟',//🧭
					x: this.center.x,
					y: this.center.y,
					z: this.center.z, // 3d
					w: 48,
					h: 48,
					l: 48, // 3d
					orbitdelay: [0, 50], // current,orbit refreh delay 
					range: { x: 100, y: 100, z: 100 }, // range of orbit effect in pixels
					div: Object
				})
			}
		}
		return datas
	}
	playersManager = () => {
		let datas = {
			players: [],
			refreshconsole: (player) => { // dev tools only // remove this if on prod
				let ship = player.ships.ships[player.currentship]
				if (document.getElementById('devconsole')) {
					document.getElementById('playerimmat').textContent = 'playerimmat:' + this.actualplayer//player.immat
					document.getElementById('x').textContent = 'x:' + ship.x
					document.getElementById('y').textContent = 'y:' + ship.y
					document.getElementById('z').textContent = 'z:' + ship.z
					document.getElementById('d').textContent = 'd:' + ship.d
					document.getElementById('speed').textContent = 'speed:' + ship.speed
					document.getElementById('move').textContent = 'move:' + ship.mods.move + "/" +
						ship.mods.moves[ship.mods.move]
					document.getElementById('limit').textContent = 'limit:' + ship.mods.limit + "/" +
						ship.mods.limits[ship.mods.limit]
					document.getElementById('dir').textContent = 'dir:' + player.dir.right + ',' + player.dir.left


					document.getElementById('asteroids').textContent = 'asteroids:' + this.asteroids.lenght
				}
			},
			create: () => {
				let immat = this.players.players.lenght ?? 0
				let newplayer = {
					immat: immat,
					score: 0,
					lifetime: 0,
					lives: 3,
					dir: { right: 0, left: 0, up: 0, down: 0 }, // right, left (arrows keys downned)
					type: 'ship',
					ships: this.shipManager('ship'),
					currentship: 0,
					resetdir: (player) => {
						player.dir = { right: 0, left: 0 }
					},
					checkdir: (player) => {
						let currentship = player.ships.ships[player.currentship]
						currentship.d += player.dir.right === 1 ? currentship.dstep : 0;
						currentship.d -= player.dir.left === 1 ? currentship.dstep : 0;

						if (currentship.d > 360) { currentship.d = currentship.d - 360 }
						else if (currentship.d < 0) { currentship.d = currentship.d + 360 }

						player.resetdir(player)
					},
					changedir: (dir, datas) => {
						let player = this.players.players[this.actualplayer]
						switch (dir) {
							case 'ArrowRight':
								player.dir.right = 1
								break
							case 'ArrowLeft':
								player.dir.left = 1
								break
							case 'ArrowUp':
								player.dir.up = 1
								break
							case 'ArrowDown':
								player.dir.down = 1
								break
							default:
								console.log('empty changedir()')
								break
						}
					},
				}
				this.players.players.push(newplayer)
				this.players.players[immat].ships.addship(this.players.players[immat])
			},
			renderPlayer: () => {
				if (this.players.players[0]) {
					this.players.players.forEach(player => {
						if (player.ships.ships[player.currentship]) {
							// player.ships.ships.forEach(ship => {
							if (player.ships.ships[player.currentship].mods) {
								player.checkdir(player)
								this.check_PlayerMoves(player)
								this.check_ShipPos(player)
								this.update_ShipDivPos(player)
								this.players.refreshconsole(player)
							}
							else {
								this.setBugAndPause('no ships define')
							}
							// });
						}
						else this.setBugAndPause('no ships mods define')
					});
				}
				else this.setBugAndPause('no player define')
			}
		}
		return datas
	}
	asteroidsManager = () => {
		let data = {
			asteroids: [],
			max: 5,
			speeds: { 0: 5 },
			create: (e) => {
				for (let i = 0; i < this.asteroids.max; i++) {
					let immat = this.asteroids.asteroids.length
					let asteroid = {
						immat: immat,
						speed: 3,
						type: 'asteroid',
						x: 32,// - ( ship.w/2),
						y: 32,// - ( ship.h/2),
						z: 32,// - ( ship.l/2), // 3d
						w: 32,
						h: 32,
						l: 32, // 3d
						d: this.aleaEntreBornes(1, 360),
						pts: 100,
						lv: 1,
						div: Object
					}
					this.asteroids.addtostack(asteroid)
				}
			},
			addtostack: (asteroid) => {
				asteroid.div = this.divmaker(asteroid.type, asteroid, false)
				this.asteroids.asteroids.push(asteroid)
				// this.asteroids.update_DivPos(asteroid)
				this.asteroids.addtodom(asteroid)
				// 	this.asteroids.add(asteroid)
			},
			addtodom: (asteroid) => {
				document.body.appendChild(asteroid.div)
			},
			update_DivPos: (asteroid) => {
				this.asteroids.check_ElementPos(asteroid)
				asteroid.x = asteroid.x + (asteroid.speed * Math.cos((asteroid.d) * (Math.PI / 180)))
				asteroid.y = asteroid.y + (asteroid.speed * Math.sin((asteroid.d) * (Math.PI / 180)))
				// div refresh attributes
				asteroid.div.style.left = parseInt((asteroid.x - (asteroid.w / 2))) + 'px'
				asteroid.div.style.top = parseInt((asteroid.y - (asteroid.h / 2))) + 'px'
				asteroid.div.style.zIndex = parseInt((asteroid.z - (asteroid.l / 2))) // dreamming to make this 3d
				asteroid.div.style.transform = 'rotate(' + (asteroid.d + 90) + 'deg)'
			},
			check_ElementPos: (asteroid) => { // check out screen position
				if (asteroid.x > (this.screen.w + (asteroid.w / 2))) { asteroid.x = 1 }
				if (asteroid.y > (this.screen.h + (asteroid.h / 2))) { asteroid.y = 1 }
				if (asteroid.z > (this.screen.l + (asteroid.l / 2))) { asteroid.z = 1 } // 3d
				if (asteroid.x < (0 - (asteroid.w / 2))) { asteroid.x = this.screen.w - 1 }
				if (asteroid.y < (0 - (asteroid.h / 2))) { asteroid.y = this.screen.h - 1 }
				if (asteroid.z < (0 - (asteroid.l / 2))) { asteroid.z = this.screen.h - 1 } // 3d
			},
			renderAsteroids: (asteroid) => {
				if (this.asteroids.asteroids[0]) {
					this.asteroids.asteroids.forEach(asteroid => {
						this.asteroids.update_DivPos(asteroid)
						this.check_collisions(asteroid)
					})
				}
			}
		}
		return data

	}
	projectilsManager = () => {
		let data = {
			projectils: [],
			projectilstodelete: [],
			speeds: { icecube: 5 },
			add: (projectil, player) => {
				projectil.div = this.divmaker(projectil.type, projectil, player)
				this.projectils.projectils.push(projectil)
				this.projectils.update_DivPos(projectil)
				this.projectils.addtodom(projectil)
			},
			addtodom: (projectil) => {
				document.body.appendChild(projectil.div)
			},
			create: (type, player) => {
				let immat = this.projectils.projectils.length
				let ship = player.ships.ships[player.currentship]
				let projectil = {
					immat: immat,
					playerimmat: player.immat,
					d: ship.d,
					speed: ship.speed > 0 ? ship.speed + (20 - ship.speed) : 20,
					x: ship.x,// + (ship.w / 2),
					y: ship.y,// + (ship.h / 2),
					z: ship.z,// + (ship.l / 2), // 3d
					lifedelay: { current: 0, max: 20 },
					w: 5,
					h: 5,
					l: 5, // 3d
					type: type,
					visual: '|',//🧊
					orbitdelay: [0, 50], // current,orbit refreh delay 
					range: { x: 30, y: 30, z: 30 }, // range of orbit effect in pixels
				}
				this.projectils.add(projectil, player)
			},
			update_DivPos: (projectil) => {
				projectil.x = projectil.x + (projectil.speed * Math.cos((projectil.d) * (Math.PI / 180)))
				projectil.y = projectil.y + (projectil.speed * Math.sin((projectil.d) * (Math.PI / 180)))
				// div refresh attributes
				projectil.div.style.left = ((projectil.x - (projectil.w / 2))) + 'px'
				projectil.div.style.top = ((projectil.y - (projectil.h / 2))) + 'px'
				projectil.div.style.zIndex = parseInt((projectil.z - (projectil.l / 2))) // dreamming to make this 3d
				projectil.div.style.transform = 'rotate(' + (projectil.d + 90) + 'deg)'
			},
			addToDeletation: (projectil) => {
				projectil.div.remove()
				this.projectils.projectilstodelete.push(projectil)
			},
			DeleteProjectils: (projectil) => {
				// delete projectil
				if (this.projectils.projectilstodelete.length > 0) {
					this.projectils.projectilstodelete.forEach(projectil => {
						this.projectils.projectils.splice(projectil, 1);
					})
					this.projectils.projectilstodelete = []
				}
			},
			renderProjectils: () => {
				if (this.projectils.projectils.length > 0) {
					this.projectils.projectils.forEach(projectil => {
						if (projectil.lifedelay.current <= projectil.lifedelay.max) {
							this.projectils.update_DivPos(projectil)
							projectil.lifedelay.current += 1
						}
						else {
							this.projectils.addToDeletation(projectil)
						}
					});
					// delete projectil
					this.projectils.DeleteProjectils()
				}
			}
		}
		return data;
	}
	shipManager(type = false) {
		let data = {
			ships: [],
			type: type ?? 'ship',
			addship: (player) => {
				player.ships.ships.push(player.ships.getnewship(player))
			},
			addtodom: () => {
				// this.players.players[this.actualplayer].ship.div.textContent = this.players.players[this.actualplayer].ship.visual
				let player = this.players.players[this.actualplayer]
				let ship = player.ships.ships[player.currentship]
				document.body.appendChild(ship.div)
			},
			changespeed: (dir) => {
				let player = this.players.players[this.actualplayer]
				let ship = player.ships.ships[player.currentship]
				switch (dir) {
					case 'ArrowUp':
						ship.speed += ship.speed < ship.speedrange.max ? 1 : 0
						break
					case 'ArrowDown':
						ship.speed -= ship.speed > ship.speedrange.min ? 1 : 0
						break
					default:
						console.log('empty changespeed()')
						break
				}
			},
			shoot: (type) => {
				let player = this.players.players[this.actualplayer]
				// let ship = player.ships.ships[player.currentship]
				this.projectils.create(type, player)
			},
			getnewship: (player) => {
				player = this.players.players[player.immat]
				let newshipimmat = player.ships.ships.length
				let ship = {
					type: 'ship',
					immat: newshipimmat,
					dstep: 45, // rotation steps for changedir()
					d: 0,
					speed: 1,
					speedrange: { min: -2, max: 20 },
					x: this.center.x,
					y: this.center.y,
					z: this.center.z, // 3d
					w: 8,
					h: 16,
					l: 8, // 3d
					tetha: 0,
					delayshoot: { current: 0, max: 50 }, //render refresh need between shoot
					div: Object,
					mods: {
						limit: 0,
						limits: ['mirrored', 'test'],
						move: 0,
						moves: ['nogravity', 'polar', 'ia', 'orbit', 'normal'],
						next: (modename) => { // l
							let player = this.players.players[this.actualplayer]
							let ship = player.ships.ships[player.currentship]
							ship.mods[modename] =
								ship.mods[modename] < ship.mods[modename + 's'].length - 1
									? ship.mods[modename] += 1
									: 0;
							// console.log('mods:' + ship.mods[modename], ship.mods[modename + 's'][ship.mods[modename]])
						},
						preview: (modename) => { // o key
							let player = this.players.players[this.actualplayer]
							let ship = player.ships.ships[player.currentship]
							ship.mods[modename] =
								ship.mods[modename] > 0
									? ship.mods[modename] -= 1
									: ship.mods[modename + 's'].length - 1;
							// console.log('mods:' + ship.mods[modename], ship.mods[modename + 's'][ship.mods[modename]])
						}
					},
				}
				ship.div = this.divmaker('ship', ship, player)
				return ship
			}
		}
		return data
	}
	divmaker = (type, item, player) => {
		// type Player || Asteroid
		let obj = document.createElement("div")
		obj.className = type
		if (type === 'asteroid') {
			obj.className = type + '  type-' + item.lv
			obj.style.position = 'absolute'
			obj.style.width = item.w + 'px'
			obj.style.height = item.h + 'px'
			obj.style.zIndex = parseInt(item.z - (item.l / 2)) // 3d
			obj.style.display = 'flex'
			obj.style.justifyContent = 'center'
			obj.style.alignItems = 'center'
			obj.style.color = 'white'
			obj.style.left = item.x + 'px'
			obj.style.top = item.y + 'px'
			// obj.style.backgroundColor = 'rgba(255, 0, 0, 1)'
			// obj.style.border = '3px dotted rgba(255,255, 255, .2)'

			let visual = document.createElement('div')
			visual.className = type + ' visual'
			visual.style.position = 'absolute'
			visual.style.width = '8px'
			visual.style.height = '16px'
			visual.style.display = 'flex'
			visual.style.justifyContent = 'center'
			visual.style.alignItems = 'center'
			// visual.style.border = '3px dotted rgba(255,255, 255, .2)'

			let range = document.createElement('div')
			range.style.position = 'absolute'
			range.className = type + ' range'
			range.style.width = '60px' // 3*3rem
			range.style.height = '60px' // 3*3rem
			range.style.borderRadius = '50%'
			range.style.display = 'flex'
			range.style.justifyContent = 'center'
			range.style.alignItems = 'start'
			// range.style.backgroundColor = 'rgba(255, 255, 255, 0.234)'
			// range.style.border = '3px dotted rgba(255,255, 255, .2)'
			obj.appendChild(range)
			obj.appendChild(visual)
		}
		if (type === 'ship') {
			obj.style.position = 'absolute'
			obj.style.width = item.w + 'px'
			obj.style.height = item.h + 'px'
			obj.style.zIndex = parseInt(item.z - (item.l / 2)) // 3d
			obj.style.display = 'flex'
			obj.style.justifyContent = 'center'
			obj.style.alignItems = 'center'
			obj.style.color = 'white'
			obj.style.left = item.x + 'px'
			obj.style.top = item.y + 'px'
			// obj.style.backgroundColor = 'rgba(0, 0, 0, 1)'
			// obj.style.border = '3px dotted rgba(255,255, 255, .2)'

			let visual = document.createElement('div')
			visual.className = 'ship visual'
			visual.style.position = 'absolute'
			visual.style.width = '8px'
			visual.style.height = '16px'
			visual.style.display = 'flex'
			visual.style.justifyContent = 'center'
			visual.style.alignItems = 'center'
			// visual.style.border = '3px dotted rgba(255,255, 255, .2)'

			let range = document.createElement('div')
			range.style.position = 'absolute'
			range.className = 'ship range'
			range.style.width = '60px' // 3*3rem
			range.style.height = '60px' // 3*3rem
			range.style.borderRadius = '50%'
			range.style.display = 'flex'
			range.style.justifyContent = 'center'
			range.style.alignItems = 'start'
			// range.style.backgroundColor = 'rgba(255, 255, 255, 0.234)'
			// range.style.border = '3px dotted rgba(255,255, 255, .2)'
			obj.appendChild(range)
			obj.appendChild(visual)
		}
		else if (type === 'icecube') {
			obj.style.position = 'absolute'
			obj.style.width = item.w + 'px'
			obj.style.height = item.h + 'px'
			obj.style.left = item.x + 'px'
			obj.style.top = item.y + 'px'
			obj.style.zIndex = parseInt(item.z - (item.l / 2)) // 3d
			obj.style.display = 'flex'
			obj.style.justifyContent = 'center'
			obj.style.alignItems = 'center'
			obj.style.color = 'white'
			obj.style.transform = 'rotate(' + (item.d + 90) + 'deg)'
			// obj.style.backgroundColor = 'rgba(255, 255, 255, 0.234)'

			let visual = document.createElement('div')
			// visual.className='visual'
			visual.style.position = 'absolute'
			visual.style.width = item.range.x + 'px'
			visual.style.height = item.range.y + 'px'
			visual.textContent = item.visual
			visual.style.display = 'flex'
			visual.style.justifyContent = 'center'
			visual.style.alignItems = 'center'

			let range = document.createElement('div')
			range.className = type + ' range'
			range.style.position = 'absolute'
			range.style.width = item.range.x + 'px'
			range.style.height = item.range.y + 'px'
			range.style.borderRadius = '50%'
			range.style.display = 'flex'
			range.style.justifyContent = 'center'
			range.style.alignItems = 'start'
			// range.style.backgroundColor = 'rgba(255, 255, 0, 0.234)'
			// range.style.border = '3px dotted rgba(255,255, 255, .2)'
			obj.appendChild(range)
			obj.appendChild(visual)
		}
		else if (type === 'cosmos') {
			// obj.style.position = 'absolute'
			// obj.style.width = '1000px' // 3*3rem
			// obj.style.height = '1000px' // 3*3rem
			// obj.style.top = '-500px' // 3*3rem
			// obj.style.left = '-500px' // 3*3rem
			// // obj.style.display = 'flex'
			// // obj.style.justifyContent = 'center'
			// // obj.style.alignItems = 'center'
			// // obj.style.borderRadius = '50%'
			// obj.style.backgroundColor = 'rgba(255, 0, 255, 0.234)'
		}
		else if (type === 'star') {
			obj.style.position = 'absolute'
			obj.style.width = item.w + 'px'
			obj.style.height = item.w + 'px'
			obj.style.top = (this.center.y - (item.h / 2)) + 'px'
			obj.style.left = (this.center.x - (item.w / 2)) + 'px'
			// obj.style.backgroundColor = 'rgba(255,255, 255, 0.05)'
			obj.style.display = 'flex'
			obj.style.justifyContent = 'center'
			obj.style.alignItems = 'center'
			obj.style.borderRadius = '50%'
			let visual = document.createElement('div')
			visual.className = type + ' visual'
			// visual.textContent = item.visual
			let range = document.createElement('div')
			range.className = type + ' visual'
			range.style.position = 'absolute'
			range.style.width = item.range.x + 'px'
			range.style.height = item.range.y + 'px'
			range.style.borderRadius = '50%'
			range.style.border = '3px dotted rgba(255,255, 255, .05)'
			// range.style.backgroundColor = 'rgba(255,255, 255, .1)'
			obj.appendChild(range)
			obj.appendChild(visual)
		}
		return obj;
	}
	addeventkey = () => {
		document.onkeydown = (eventkeydown) => {
			// console.log(eventkeydown.key)

			let player = this.players.players[this.actualplayer]
			let ship = player.ships.ships[player.currentship]

			if (eventkeydown.key === "p") { this.setPause() }
			if (eventkeydown.key === "n") { ship.mods.next('move') }
			if (eventkeydown.key === "j") { ship.mods.preview('move') }
			if (eventkeydown.key === "l") { ship.mods.next('limit') } // 3d
			if (eventkeydown.key === "k") { ship.mods.preview('limit') }
			if (eventkeydown.key === " ") { player.ships.shoot('icecube') }

			if (eventkeydown.key === "ArrowLeft") { player.changedir(eventkeydown.key) }
			if (eventkeydown.key === "ArrowRight") { player.changedir(eventkeydown.key) }
			if (eventkeydown.key === "ArrowUp") { player.ships.changespeed(eventkeydown.key) }
			if (eventkeydown.key === "ArrowDown") { player.ships.changespeed(eventkeydown.key) }
		}
		window.addEventListener('resize', (event) => {
			this.screenRatio = {
				w: this.screen.w / window.innerWidth,
				h: this.screen.h < window.innerHeight ? window.innerHeight / this.screen.h : this.screen.h / window.innerHeight,
				l: (((this.screen.w + this.screen.h) / 2) + ((window.innerWidth + window.innerHeight) / 2) / 2) // 3d
			}
			this.center = { x: (window.innerWidth / 2), y: (window.innerHeight / 2), z: 0 }
			this.screen = { w: window.innerWidth, h: window.innerHeight, l: ((window.innerHeight + window.innerWidth) / 2) }
		}, true)

	}
	check_ShipPos = (player) => { // check out screen position
		let ship = player.ships.ships[player.currentship]
		if (ship.mods.moves[ship.mods.move] != 'orbit') {
			if (ship.x > (this.screen.w + (ship.w / 2))) { ship.x = 1 }
			if (ship.y > (this.screen.h + (ship.h / 2))) { ship.y = 1 }
			if (ship.z > (this.screen.l + (ship.l / 2))) { ship.z = 1 } // 3d
			if (ship.x < (0 - (ship.w / 2))) { ship.x = this.screen.w - 1 }
			if (ship.y < (0 - (ship.h / 2))) { ship.y = this.screen.h - 1 }
			if (ship.z < (0 - (ship.l / 2))) { ship.z = this.screen.h - 1 } // 3d
		}
	}
	update_ShipDivPos = (player) => {
		let ship = player.ships.ships[player.currentship]
		ship.div.style.left = ((ship.x - (ship.w / 2))) + 'px'
		ship.div.style.top = ((ship.y - (ship.h / 2))) + 'px'
		ship.div.style.zIndex = ((ship.z - (ship.l / 2))) // 3d
		// (have to clean my mind with the mess radian/degrees & and html rotate
		// html/css = 0deg for north
		// and js math = -90 for north WTF ?? 
		ship.div.style.transform = 'rotate(' + (ship.d + 90) + 'deg)'
	}
	aleaEntreBornes(minimum, maximum) {
		return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
	}
	setPause() {
		this.Pause = !this.Pause
	}
	setBugAndPause(string = false) {
		this.Bug = true
		this.Pause = true
		if (this.Bug && this.Pause) {
			console.log('bug ! game paused')
			if (string) { console.log(string) }
		}

	}

	get_distance = (a, b) => { // get hypotenus with pythaGore
		let AB = (a.x + (a.w / 2)) - (b.x + (b.w / 2))
		let AC = (a.y + (a.h / 2)) - (b.y + (b.h / 2))
		return Math.sqrt((AB * AB) + (AC * AC))
	}
	check_collisions = (asteroid) => {
		let alertedistancebeforedie = 30
		// CHECK COLLiSION with projectils
		if (this.projectils.projectils[0]) {
			this.projectils.projectils.forEach(projectil => {
				let distance = this.get_distance(asteroid, projectil);
				if (!projectil.unarmed) {
					if (distance < ((projectil.w / 2) + (asteroid.w / 2))) {
						this.projectils.addToDeletation(projectil)
						console.log('boom: ' + asteroid.immat)
						asteroid.unarmed = true
						asteroid.div.style.backgroundColor = "red"
						asteroid.div.classList.add('unarmed')
						asteroid.div.textContent = "BOOM"
					}
				}
				//console.log(distance)
			})
		}
		// this.MF[typeobj].forEach(objB => {
		// 	if (objB.immat != obj.immat) {
		// 		let distance = this.get_distance(obj, objB);
		// 		// die alert range test only for player right now
		// 		if (obj.objtype === 'player') {
		// 			// self range test (explode condition here)
		// 			(distance < ((obj.sizwhl.w / 2) + (objB.sizwhl.w / 2)))
		// 				? obj.collide.collideself = true
		// 				: '';
		// 		}
		// 		((distance - alertedistancebeforedie) < ((obj.sizwhl.w / 2) + (objB.sizwhl.w / 2)))
		// 			? obj.collide.collidealert = true
		// 			: '';
		// 		// rangea test
		// 		(distance < ((obj.sizwhl.w * 2) + (objB.sizwhl.w)))
		// 			? obj.collide.colliderangea = true
		// 			: '';
		// 		this.check_collisionsDirectives(obj, objB)
		// 	}
		// });
	}
}
let isLoaded = () => {
	let AsteroidGame = new Asteroid()
}
window.addEventListener('load', isLoaded, false)
