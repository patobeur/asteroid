"use strict";
class asteroid {
	constructor() {
		this.Pause = false;
		this.actualplayer = 0;
		this.center = { x: (window.innerWidth / 2), y: (window.innerHeight / 2), z: 0 }
		this.screen = { w: window.innerWidth, h: window.innerHeight, l: ((window.innerHeight + window.innerWidth) / 2) }
		// this.screenRatio = {w:1,h:1,l:1}
		// this.cosmos = this.cosmosManager()
		this.players = this.playersManager()
		this.stars = this.starsManager()
		this.projectils = this.projectilsManager()
		this.proj = () => {
			return this.projectils.length
		}
		this.createAndAddCss()
		this.startGame()
	}
	createAndAddCss = () => {
		let stringcss = 'body {overflow: hidden;font-family: monospace;background: #28282b}'
		stringcss += '#devconsole {position: absolute;top: 10px;left: 10px;width: -webkit-max-content;width: -moz-max-content;width: max-content;font-size: 0.7rem;color: white;}'
		stringcss += ''
		stringcss += '*,::before,::after {margin: 0;padding: 0;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;-webkit-box-sizing: border-box;box-sizing: border-box;}'
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
		this.players.add()
		this.players.players[this.actualplayer].ship.addtodom()
		setInterval(() => { this.render() }, 100);
		this.addeventkey()
	}
	render = () => {
		if (!this.Pause) {
			this.projectils.projectils.forEach(projectil => {
				if (projectil.lifedelay.current <= projectil.lifedelay.max) {
					this.projectils.update_DivPos(projectil)
					projectil.lifedelay.current += 1
				}
				else {
					projectil.div.remove()
					// console.log(projectil.lifedelay.current, '/', projectil.lifedelay.max)
					// to do remove this from array
					// without breaking the music ,(
					// need friends
				}
			});
			this.players.players.forEach(player => {

				player.checkdir(player)

				this.check_PlayerMoves(player)
				this.check_ShipPos(player)
				this.update_ShipDivPos(player)
				this.players.refreshconsole(player)
			});
		}
	}
	check_PlayerMoves = (player) => {
		let star = this.stars.stars[0]
		// let distance = this.get_distance(player,star)
		let x = player.ship.x
		let y = player.ship.y
		let z = player.ship.z // 3d
		let d = player.ship.d
		let speed = player.ship.speed
		// let dRatio = parseInt(d / 360 * 100000) / 100000 // 0.0 to 1
		let ship = player.ship

		// 0:'normal', 1:'nogravity', 2:'ia', 3:'orbit', 4:'polar'
		if (player.ship.mods.move === 0) { // normal move mods
			// to do
			// console.log(d)
			ship.x = ship.x + (speed * Math.cos((d) * (Math.PI / 180)))
			ship.y = ship.y + (speed * Math.sin((d) * (Math.PI / 180)))
		}
		else if (player.ship.mods.move === 1) { // nogravity ??
			// to do
			ship.x = ship.x + (speed * Math.cos((d) * (Math.PI / 180)))
			ship.y = ship.y + (speed * Math.sin((d) * (Math.PI / 180)))
		}
		else if (player.ship.mods.move === 2) { // ia
			// to do
		}
		else if (player.ship.mods.move === 3) { // orbit
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
				x2 = starx + Math.round((distance) * (Math.cos(player.ship.d * (180 / Math.PI))));
				y2 = stary + Math.round((distance) * (Math.sin(player.ship.d * (180 / Math.PI))));
				player.ship.d += 1
			}
			else {
				x2 = starx + Math.round(starw * (Math.cos(player.ship.d * (180 / Math.PI))));
				y2 = stary + Math.round(starh * (Math.sin(player.ship.d * (180 / Math.PI))));
				player.ship.d += 1
			}
			// saving new pos in obj
			player.ship.x = x2 - (player.ship.w / 2)
			player.ship.y = y2 - (player.ship.h / 2)
			// if(ship.d >360){ship.d=1}
		}
		else if (player.ship.mods.move === 4) { // polar coordinate 
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
	setPause() {
		this.Pause = !this.Pause
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
				if (document.getElementById('devconsole')) {
					document.getElementById('playerimmat').textContent = 'playerimmat:' + this.actualplayer//player.immat
					document.getElementById('x').textContent = 'x:' + player.ship.x
					document.getElementById('y').textContent = 'y:' + player.ship.y
					document.getElementById('z').textContent = 'z:' + player.ship.z
					document.getElementById('d').textContent = 'd:' + player.ship.d
					document.getElementById('speed').textContent = 'speed:' + player.ship.speed
					document.getElementById('move').textContent = 'move:' + player.ship.mods.move + "/" +
						player.ship.mods.moves[player.ship.mods.move]
					document.getElementById('limit').textContent = 'limit:' + player.ship.mods.limit + "/" +
						player.ship.mods.limits[player.ship.mods.limit]
					document.getElementById('dir').textContent = 'dir:' + player.dir.right + ',' + player.dir.left
				}
			},
			add: () => {
				let immat = this.players.players.lenght ?? 0
				this.players.players.push({
					immat: immat,
					ship: this.shipManager('ship'),
					score: 0,
					lifetime: 0,
					lives: 3,
					dir: { right: 0, left: 0, up: 0, down: 0 }, // right, left (arrows keys downned)
					resetdir: (player) => {
						player.dir = { right: 0, left: 0 }
					},
					checkdir: (player) => {
						player.ship.d += player.dir.right === 1 ? player.ship.dstep : 0;
						player.ship.d -= player.dir.left === 1 ? player.ship.dstep : 0;

						if (player.ship.d > 360) { player.ship.d = player.ship.d - 360 }
						else if (player.ship.d < 0) { player.ship.d = player.ship.d + 360 }

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
					}
				})
			}
		}
		return datas
	}
	projectilsManager = () => {
		let data = {
			projectils: [],
			speeds: { icecube: 5 },
			add: (projectil, player) => {
				// console.log('projectil added to list')
				// console.log(projectil)
				let newprojectil = {
					playerimmat: projectil.playerimmat ?? false,
					immat: projectil.immat ?? 0,
					type: projectil.type ?? 'icecube',
					d: projectil.d ?? 270,
					speed: this.projectils.speeds[projectil.type] ?? 1,
					x: projectil.x ?? 0,
					y: projectil.y ?? 0,
					z: projectil.z ?? 0, // 3d
					w: projectil.w ?? 0,
					h: projectil.h ?? 0,
					l: projectil.l ?? 0, // 3d
					lifedelay: projectil.lifedelay ?? { current: 0, max: 20 },
					visual: projectil.visual ?? '|',
					orbitdelay: [0, 50], // current,orbit refreh delay 
					range: projectil.range ?? { x: 10, y: 10, z: 10 }, // range of orbit effect in pixels
					div: Object
				}
				projectil.div = this.divmaker_projectils(projectil.type, projectil, player)
				this.projectils.projectils.push(projectil)
				this.projectils.addtodom(projectil)
			},
			addtodom: (projectil) => {
				document.body.appendChild(projectil.div)
			},
			create: (type, player) => {
				let immat = this.projectils.projectils.length
				let projectil = {
					immat: immat,
					playerimmat: player.immat,
					d: player.ship.d,
					speed: 10,
					x: player.ship.x,// - ( player.ship.w/2),
					y: player.ship.y,// - ( player.ship.h/2),
					z: player.ship.z,// - ( player.ship.l/2), // 3d
					lifedelay: { current: 0, max: 100 },
					w: 5,
					h: 12,
					l: 5, // 3d
					type: 'icecube',
					visual: 'o',
					orbitdelay: [0, 50], // current,orbit refreh delay 
					range: { x: 30, y: 30, z: 30 }, // range of orbit effect in pixels
				}
				this.projectils.add(projectil, player)
			},
			update_DivPos: (projectil) => {
				projectil.x = projectil.x + (projectil.speed * Math.cos((projectil.d) * (Math.PI / 180)))
				projectil.y = projectil.y + (projectil.speed * Math.sin((projectil.d) * (Math.PI / 180)))
				// div refresh attributes
				projectil.div.style.left = ((projectil.x)) + 'px'
				projectil.div.style.top = ((projectil.y)) + 'px'
				projectil.div.style.zIndex = parseInt((projectil.z - (projectil.l / 2))) // dreamming to make this 3d
				projectil.div.style.transform = 'rotate(' + (projectil.d + 90) + 'deg)'
				projectil.div.style.backgroundColor = 'green'

			}
		}
		return data;
	}
	shipManager(type) {
		let immat = this.players.players.lenght
		return {
			visual: '🌵',//🢁🢙🡁🢙⇧
			immat: this.immat,
			x: this.center.x,
			y: this.center.y,
			z: this.center.z, // 3d
			d: 0,
			dstep: 45, // rotation steps for changedir()
			speed: 1,
			speedrange: { min: -2, max: 5 },
			w: 48,
			h: 48,
			l: 48, // 3d
			type: 'ship',
			tetha: 0,
			div: this.divmaker(type),
			mods: {
				limit: 0,
				limits: ['mirrored', 'test'],
				move: 0,
				moves: ['nogravity', 'polar', 'ia', 'orbit', 'normal'],
				next: (modename) => { // l
					let player = this.players.players[this.actualplayer]
					player.ship.mods[modename] =
						player.ship.mods[modename] < player.ship.mods[modename + 's'].length - 1
							? player.ship.mods[modename] += 1
							: 0;
					console.log('mods:' + player.ship.mods[modename], player.ship.mods[modename + 's'][player.ship.mods[modename]])
				},
				preview: (modename) => { // o key
					let player = this.players.players[this.actualplayer]
					player.ship.mods[modename] =
						player.ship.mods[modename] > 0
							? player.ship.mods[modename] -= 1
							: player.ship.mods[modename + 's'].length - 1;
					console.log('mods:' + player.ship.mods[modename], player.ship.mods[modename + 's'][player.ship.mods[modename]])
				}
			},
			addtodom: () => {
				// this.players.players[this.actualplayer].ship.div.textContent = this.players.players[this.actualplayer].ship.visual
				document.body.appendChild(this.players.players[this.actualplayer].ship.div)
			},
			changespeed: (dir) => {
				let ship = this.players.players[this.actualplayer].ship
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
				this.projectils.create(type, this.players.players[this.actualplayer])
			},
		}
	}
	divmaker_projectils = (type, projectil, player) => {
		// console.log(projectil)
		let obj = document.createElement("div")
		if (type === 'icecube') {
			obj.style.position = 'absolute'
			obj.style.width = projectil.w + 'px'
			obj.style.height = projectil.h + 'px'
			obj.style.left = projectil.x + 'px'
			obj.style.top = projectil.y + 'px'
			obj.style.zIndex = parseInt(projectil.z - (projectil.l / 2)) // 3d
			obj.style.display = 'flex'
			obj.style.justifyContent = 'center'
			obj.style.alignItems = 'center'
			obj.style.color = 'white'
			obj.style.backgroundColor = 'rgba(255, 255, 255, 0.234)'

			obj.style.transform = 'rotate(' + (projectil.d + 90) + 'deg)'
			let visual = document.createElement('div')
			visual.style.position = 'absolute'
			// visual.className='visual'
			visual.style.width = projectil.range.x + 'px'
			visual.style.height = projectil.range.y + 'px'
			visual.textContent = projectil.visual//⇧
			visual.style.display = 'flex'
			visual.style.justifyContent = 'center'
			visual.style.alignItems = 'center'
			let range = document.createElement('div')
			range.style.position = 'absolute'
			// range.className='range'
			range.textContent = '⇧'//⇧
			range.style.width = projectil.range.x + 'px'
			range.style.height = projectil.range.y + 'px'
			range.style.borderRadius = '50%'
			range.style.backgroundColor = 'rgba(255, 255, 0, 0.234)'
			range.style.border = '3px dotted rgba(255,255, 255, .2)'
			range.style.display = 'flex'
			range.style.justifyContent = 'center'
			range.style.alignItems = 'start'
			obj.appendChild(range)
			obj.appendChild(visual)
		}

		return obj;
	}
	divmaker = (type, element, player) => {
		// type Player || Asteroid
		let obj = document.createElement("div")
		if (type === 'ship') {
			obj.style.position = 'absolute'
			obj.style.width = '58px' // 3*3rem
			obj.style.height = '58px' // 3*3rem
			obj.style.display = 'flex'
			obj.style.justifyContent = 'center'
			obj.style.alignItems = 'center'
			obj.style.borderRadius = '50%'
			obj.style.color = 'white'
			// obj.style.backgroundColor = 'rgba(255, 255, 255, 0.234)'

			let visual = document.createElement('div')
			visual.style.position = 'absolute'
			// visual.className='visual'
			visual.style.width = '58px' // 3*3rem
			visual.style.height = '58px' // 3*3rem
			visual.textContent = '🌵'//⇧
			visual.style.display = 'flex'
			visual.style.justifyContent = 'center'
			visual.style.alignItems = 'center'
			let range = document.createElement('div')
			range.style.position = 'absolute'
			// range.className='range'
			range.textContent = '⇧'//⇧
			range.style.width = '60px' // 3*3rem
			range.style.height = '60px' // 3*3rem
			range.style.borderRadius = '50%'
			range.style.backgroundColor = 'rgba(255, 255, 0, 0.234)'
			range.style.border = '3px dotted rgba(255,255, 255, .2)'
			range.style.display = 'flex'
			range.style.justifyContent = 'center'
			range.style.alignItems = 'start'
			obj.appendChild(range)
			obj.appendChild(visual)
		}
		else if (type === 'cosmos') {
			obj.style.position = 'absolute'
			obj.style.width = '1000px' // 3*3rem
			obj.style.height = '1000px' // 3*3rem
			obj.style.top = '-500px' // 3*3rem
			obj.style.left = '-500px' // 3*3rem
			// obj.style.display = 'flex'
			// obj.style.justifyContent = 'center'
			// obj.style.alignItems = 'center'
			// obj.style.borderRadius = '50%'
			obj.style.backgroundColor = 'rgba(255, 0, 255, 0.234)'
		}
		else if (type === 'star') {
			obj.style.position = 'absolute'
			obj.style.width = element.w + 'px'
			obj.style.height = element.w + 'px'
			obj.style.top = this.center.y + 'px'
			obj.style.left = this.center.x + 'px'
			obj.style.backgroundColor = 'rgba(255,255, 255, 0.2)'
			obj.style.display = 'flex'
			obj.style.justifyContent = 'center'
			obj.style.alignItems = 'center'
			obj.style.borderRadius = '50%'
			let visual = document.createElement('div')
			// visual.className='visual'
			visual.textContent = element.visual
			let range = document.createElement('div')
			// range.className=''
			range.style.position = 'absolute'
			range.style.width = element.range.x + 'px'
			range.style.height = element.range.y + 'px'
			range.style.borderRadius = '50%'
			range.style.border = '3px dotted rgba(255,255, 255, .2)'
			range.style.backgroundColor = 'rgba(255,255, 255, .1)'
			obj.appendChild(range)
			obj.appendChild(visual)
		}
		return obj;
	}
	addeventkey = () => {
		document.onkeydown = (eventkeydown) => {
			console.log(eventkeydown.key)
			if (eventkeydown.key === "p") { this.setPause() }
			if (eventkeydown.key === "n") { this.players.players[this.actualplayer].ship.mods.next('move') }
			if (eventkeydown.key === "j") { this.players.players[this.actualplayer].ship.mods.preview('move') }
			if (eventkeydown.key === "l") { this.players.players[this.actualplayer].ship.mods.next('limit') } // 3d
			if (eventkeydown.key === "k") { this.players.players[this.actualplayer].ship.mods.preview('limit') }
			if (eventkeydown.key === " ") { this.players.players[this.actualplayer].ship.shoot('icecube') }
			// -- 
			if (eventkeydown.key === "ArrowLeft") { this.players.players[this.actualplayer].changedir(eventkeydown.key) }
			if (eventkeydown.key === "ArrowRight") { this.players.players[this.actualplayer].changedir(eventkeydown.key) }
			if (eventkeydown.key === "ArrowUp") { this.players.players[this.actualplayer].ship.changespeed(eventkeydown.key) }
			if (eventkeydown.key === "ArrowDown") { this.players.players[this.actualplayer].ship.changespeed(eventkeydown.key) }
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
	check_ShipPos = (player) => {
		if (player.ship.mods.moves[player.ship.mods.move] != 'orbit') {
			if (player.ship.x > (this.screen.w + (player.ship.w / 2))) { player.ship.x = 1 }
			if (player.ship.y > (this.screen.h + (player.ship.h / 2))) { player.ship.y = 1 }
			if (player.ship.z > (this.screen.l + (player.ship.l / 2))) { player.ship.z = 1 } // 3d
			if (player.ship.x < (0 - (player.ship.w / 2))) { player.ship.x = this.screen.w - 1 }
			if (player.ship.y < (0 - (player.ship.h / 2))) { player.ship.y = this.screen.h - 1 }
			if (player.ship.z < (0 - (player.ship.l / 2))) { player.ship.z = this.screen.h - 1 } // 3d
		}
	}
	update_ShipDivPos = (player) => {
		player.ship.div.style.left = ((player.ship.x - (player.ship.w / 2))) + 'px'
		player.ship.div.style.top = ((player.ship.y - (player.ship.h / 2))) + 'px'
		player.ship.div.style.zIndex = ((player.ship.z - (player.ship.l / 2))) // 3d
		// (have to clean my mind with the mess radian/degrees & and html rotate
		// html/css = 0deg for north
		// and js math = -90 for north WTF ?? 
		player.ship.div.style.transform = 'rotate(' + (player.ship.d + 90) + 'deg)'
	}
	get_distance = (player, star) => { // get hypotenus with pythaGore
		let ship = player.ship
		let AB = (ship.x + (ship.w / 2)) - (star.x + (star.w / 2))
		let AC = (ship.y + (ship.h / 2)) - (star.y + (star.h / 2))
		let distance = Math.sqrt((AB * AB) + (AC * AC))
		return distance
	}
	// cosmosManager = () => {
	// 	let datas = {
	// 		div: this.divmaker('cosmos'),
	// 		addtodom: () => {
	// 			document.body.appendChild(this.cosmos.div)
	// 		}
	// 	}
	// 	return datas
	// }
}
let isLoaded = () => {
	let Asteroid = new asteroid()
}
window.addEventListener('load', isLoaded, false)
