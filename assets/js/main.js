"use strict";
class Asteroid {
	constructor() {
		this.isPause = false;
		this.isBug = false;
		this.isNextPlayer = false;
		this.isVisualHelp = false;
		this.isDisplayInfo = false;
		this.renderInterval = 25
		this.actualPlayer = 0;
		this.maxPlayer = 2;
		this.coins = 0;
		this.gameRender = false
		this.wait = false
		this.shipList = 0
		// -- 
		// Modal principal
		this.front = this.FrontManager()
		// -- 
		this.center = { x: (window.innerWidth / 2), y: (window.innerHeight / 2), z: 0 }
		this.screen = { w: window.innerWidth, h: window.innerHeight, l: ((window.innerHeight + window.innerWidth) / 2) }
		// this.screenRatio = {w:1,h:1,l:1}
		// this.cosmos = this.cosmosManager()
		this.devTools = this.getDevTools() // dev tools
		// --
		this.front.create()
		this.players = this.playersManager()
		// this.stars = this.starsManager() // not really needed
		this.projectils = this.projectilsManager()
		this.asteroids = this.asteroidsManager()
		this.createAndAddCss()
		this.addEventKeyHelp()
	}
	FrontManager = () => {
		let front = {
			up: {
				content: 'faster',
				type: 'up',
				div: Object
			},
			touch: {
				content: '',
				type: 'touch',
				div: Object
			},
			down: {
				content: 'Slower',
				type: 'down',
				div: Object
			},
			shoot: {
				content: 'shoot',
				type: 'shoot',
				div: Object
			},
			left: {
				content: 'Left',
				type: 'left',
				div: Object
			},
			right: {
				content: 'Right',
				type: 'right',
				div: Object
			},
			titlebloc: {
				content: '',
				type: 'titlebloc',
				div: Object
			},
			title: {
				content: 'Asteroid',
				type: 'title',
				div: Object
			},
			subtitle: {
				content: 'tribute',
				type: 'subtitle',
				div: Object
			},
			footer: {
				content: '1 coin 1 play',
				type: 'footer',
				div: Object
			},
			footer2: {
				content: 'asteroids by Patobeur',
				type: 'footer2',
				div: Object
			},
			scorep1: {
				content: 0,
				type: 'scorep1',
				div: Object
			},
			scorep2: {
				content: 0,
				type: 'scorep2',
				div: Object
			},
			coins: {
				content: 0,
				type: 'coins',
				div: Object
			},
			content: 0,
			type: 'scorep2',
			div: {
				content: '',
				type: 'touch',
				div: Object
			},
			create: () => {
				this.front.createScores()
				this.front.createInfo()
			},
			createTouch: () => {
				let player = this.players.players[this.actualPlayer]
				this.front.up.div = this.front.divMaker(this.front.up)
				this.front.down.div = this.front.divMaker(this.front.down)
				this.front.left.div = this.front.divMaker(this.front.left)
				this.front.right.div = this.front.divMaker(this.front.right)
				this.front.shoot.div = this.front.divMaker(this.front.shoot)

				this.front.up.div.addEventListener('click', (e) => { this.players.players[this.actualPlayer].ships.changespeed('ArrowUp') })
				this.front.down.div.addEventListener('click', (e) => { this.players.players[this.actualPlayer].ships.changespeed('ArrowDown') })
				this.front.left.div.addEventListener('click', (e) => { this.players.players[this.actualPlayer].changedir('ArrowLeft') })
				this.front.right.div.addEventListener('click', (e) => { this.players.players[this.actualPlayer].changedir('ArrowRight') })
				this.front.shoot.div.addEventListener('click', () => { this.players.players[this.actualPlayer].ships.shoot('icecube') })



				this.front.div = this.front.divMaker(this.front.div)
				this.front.div.appendChild(this.front.up.div)
				this.front.div.appendChild(this.front.down.div)
				this.front.div.appendChild(this.front.left.div)
				this.front.div.appendChild(this.front.right.div)

				document.body.appendChild(this.front.div)
				document.body.appendChild(this.front.shoot.div)
			},
			createScores: () => {
				this.front.scorep1.div = this.front.divMaker(this.front.scorep1)
				this.front.scorep2.div = this.front.divMaker(this.front.scorep2)
				document.body.appendChild(this.front.scorep1.div)
				document.body.appendChild(this.front.scorep2.div)
			},
			createInfo: () => {
				this.front.titlebloc.div = this.front.divMaker(this.front.titlebloc)
				this.front.title.div = this.front.divMaker(this.front.title)
				this.front.subtitle.div = this.front.divMaker(this.front.subtitle)
				this.front.footer.div = this.front.divMaker(this.front.footer)
				this.front.footer2.div = this.front.divMaker(this.front.footer2)
				this.front.coins.div = this.front.divMaker(this.front.coins)

				this.front.titlebloc.div.appendChild(this.front.title.div)
				this.front.titlebloc.div.appendChild(this.front.subtitle.div)
				document.body.appendChild(this.front.titlebloc.div)

				// document.body.appendChild(this.front.title.div)
				// document.body.appendChild(this.front.subtitle.div)
				document.body.appendChild(this.front.footer.div)
				document.body.appendChild(this.front.footer2.div)
				document.body.appendChild(this.front.coins.div)
			},
			divMaker: (frontpart) => {
				let obj = document.createElement("div")
				obj.className = frontpart.type
				obj.textContent = frontpart.content
				obj.style.position = 'absolute'
				if (frontpart.type === 'titlebloc') {
					obj.style.top = '50%'
					obj.style.left = '50%'
					obj.style.display = 'flex'
					obj.style.flexDirection = 'column'
					obj.style.justifyContent = 'center'
					obj.style.alignItems = 'center'
					obj.style.transform = 'translate(-50%,-50%)'
				}
				if (frontpart.type === 'title') {
					obj.style.position = 'relative'
				}
				if (frontpart.type === 'subtitle') {
					obj.style.position = 'relative'
					obj.style.backgroundColor = '#20FF2020'
				}
				if (frontpart.type === 'footer') {
					obj.style.bottom = '15%'
					obj.style.left = '50%'
					obj.style.transform = 'translate(-50%, -50%)'
				}
				if (frontpart.type === 'footer2') {
					obj.style.bottom = '2%'
					obj.style.left = '50%'
					obj.style.transform = 'translate(-50%, -50%)'
				}
				if (frontpart.type === 'scorep1') {
					obj.style.top = '5%'
					obj.style.left = '25%'
				}
				if (frontpart.type === 'scorep2') {
					obj.style.top = '5%'
					obj.style.right = '25%'
				}
				if (frontpart.type === 'coins') {
					obj.style.top = '8%'
					obj.style.left = '50%'
					obj.style.transform = 'translateX(-50%)'
				}
				return obj;
			},
			addCoin: () => {
				this.coins = this.coins < 99 ? this.coins + 1 : this.coins
				this.front.coins.div.textContent = this.coins
			},
			removeinfo: () => {
				this.front.titlebloc.div.remove()
				// this.front.subtitle.div.remove()
				this.front.footer.div.remove()
				this.front.footer2.div.remove()
				this.front.coins.div.remove()
			},
			removeTouch: () => {
				this.front.up.div.remove()
				this.front.down.div.remove()
				this.front.left.div.remove()
				this.front.right.div.remove()
				this.front.shoot.div.remove()
			},
			addScore: (source) => {
				console.log('add ' + parseInt(source.pts) + 'pts to : player ' + this.actualPlayer)
				let player = this.players.players[this.actualPlayer]
				if (source.pts > 0 && (player.score === 0 || player.score > 0)) {
					player.score = player.score + parseInt(source.pts)
					let targetScore = 'scorep' + (this.actualPlayer + 1)
					this.front[targetScore].div.textContent = parseInt(player.score)
				}
			},
			checkfront: (source) => {
				if (this.actualPlayer) {
					console.log('checkfront:' + source)
				}
			}
		}
		return front
	}
	divMaker = (type, item, player) => {
		// type Player || Asteroid
		let obj = document.createElement("div")
		obj.className = type
		if (type === 'asteroid') {
			obj.className = type + '  type-' + item.lv
			obj.style.position = 'absolute'
			obj.style.width = item.w + 'px'
			obj.style.height = item.h + 'px'
			// obj.style.zIndex = parseInt(item.z - (item.l / 2)) // 3d

			obj.style.zIndex = -10
			obj.style.display = 'flex'
			obj.style.justifyContent = 'center'
			obj.style.alignItems = 'center'
			// obj.style.color = 'white'
			obj.style.left = item.x + 'px'
			obj.style.top = item.y + 'px'
			obj.style.borderRadius = '50%'

			let visual = document.createElement('div')
			visual.className = type + ' visual'
			visual.style.position = 'absolute'
			visual.style.width = item.w + 'px'
			visual.style.height = item.h + 'px'
			visual.style.display = 'flex'
			visual.style.justifyContent = 'center'
			visual.style.alignItems = 'center'
			visual.style.borderRadius = '50%'
			visual.textContent = item.immat
			visual.style.fontSize = ".5rem"

			let range = document.createElement('div')
			range.className = type + ' range'
			range.style.position = 'absolute'
			range.style.width = item.range.x + 'px'
			range.style.height = item.range.y + 'px'
			range.style.borderRadius = '50%'
			range.style.display = 'flex'
			range.style.justifyContent = 'center'
			range.style.alignItems = 'start'

			obj.appendChild(range)
			obj.appendChild(visual)
		}
		if (type === 'ship') {
			obj.style.position = 'absolute'
			obj.className = type
			obj.style.width = item.w + 'px'
			obj.style.height = item.h + 'px'
			obj.style.zIndex = parseInt(item.z - (item.l / 2)) // 3d
			obj.style.display = 'flex'
			obj.style.justifyContent = 'center'
			obj.style.alignItems = 'center'
			// obj.style.color = 'white'
			obj.style.left = item.x + 'px'
			obj.style.top = item.y + 'px'

			let visual = document.createElement('div')
			visual.className = type + ' visual'
			visual.style.position = 'absolute'
			visual.style.width = item.w + 'px'
			visual.style.height = item.h + 'px'
			visual.style.display = 'flex'
			visual.style.justifyContent = 'center'
			visual.style.alignItems = 'center'

			let range = document.createElement('div')
			range.style.position = 'absolute'
			range.className = type + ' range'
			range.style.width = item.range.x + 'px'
			range.style.height = item.range.y + 'px'
			range.style.borderRadius = '50%'
			range.style.display = 'flex'
			range.style.justifyContent = 'center'
			range.style.alignItems = 'start'

			obj.appendChild(range)
			obj.appendChild(visual)
		}
		else if (type === 'icecube') {
			obj.className = 'projectil ' + type
			obj.style.position = 'absolute'
			obj.style.width = item.w + 'px'
			obj.style.height = item.h + 'px'
			obj.style.left = item.x + 'px'
			obj.style.top = item.y + 'px'
			obj.style.zIndex = parseInt(item.z - (item.l / 2)) // 3d
			obj.style.display = 'flex'
			obj.style.justifyContent = 'center'
			obj.style.alignItems = 'center'
			// obj.style.color = 'white'
			obj.style.transform = 'rotate(' + (item.d + 90) + 'deg)'

			let visual = document.createElement('div')
			visual.className = 'projectil visual'
			visual.textContent = item.visual
			visual.style.position = 'absolute'
			visual.style.width = item.w + 'px'
			visual.style.height = item.h + 'px'
			visual.style.display = 'flex'
			visual.style.justifyContent = 'center'
			visual.style.alignItems = 'center'

			let range = document.createElement('div')
			range.className = 'projectil range'
			range.style.position = 'absolute'
			range.style.width = item.range.x + 'px'
			range.style.height = item.range.y + 'px'
			range.style.borderRadius = '50%'
			range.style.display = 'flex'
			range.style.justifyContent = 'center'
			range.style.alignItems = 'center'

			obj.appendChild(range)
			obj.appendChild(visual)
		}
		else if (type === 'star') {
			obj.style.position = 'absolute'
			obj.style.width = item.w + 'px'
			obj.style.height = item.w + 'px'
			obj.style.top = (this.center.y - (item.h / 2)) + 'px'
			obj.style.left = (this.center.x - (item.w / 2)) + 'px'
			obj.style.display = 'flex'
			obj.style.justifyContent = 'center'
			obj.style.alignItems = 'center'
			obj.style.borderRadius = '50%'

			let visual = document.createElement('div')
			visual.className = type + ' visual'

			let range = document.createElement('div')
			range.className = type + ' range'
			range.style.position = 'absolute'
			range.style.width = item.range.x + 'px'
			range.style.height = item.range.y + 'px'
			range.style.borderRadius = '50%'

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
		return obj;
	}
	createAndAddCss = () => {
		let stringcss = '@font-face { font-family: "vectorbattle";src: url("assets/fonts/VectorBattle.ttf") format("truetype")}'
		stringcss += 'body {overflow: hidden;font-family: vectorbattle;letter-spacing: .2rem;background-color: #202020;width: 100%;height: 100%;color:white;}'
		stringcss += '*,::before,::after {margin: 0;padding: 0;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;-webkit-box-sizing: border-box;box-sizing: border-box;}'
		stringcss += '.asteroid {opacity: 1; animation: 0.5s linear init;}'
		stringcss += '.asteroid.unarmed {animation: 0.3s linear boom;opacity: 1;}'
		stringcss += '.asteroid.nearest {background-Color:green}'
		stringcss += '.asteroid.type-1 {position: absolute;background-image: url("data:image/svg+xml,%3C%3Fxml version=\'1.0\' encoding=\'utf-8\'%3F%3E%3C!-- Generator: auto --%3E%3Csvg version=\'1.1\' id=\'Calque_1\' xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' x=\'0px\' y=\'0px\' viewBox=\'-119 121 16 16\' style=\'enable-background:new -119 121 16 16;\' xml:space=\'preserve\'%3E%3Cpolygon id=\'_x31_\' style=\'fill:none;stroke:%23FFFFFF;stroke-width:0.5;stroke-linecap:square;stroke-linejoin:bevel;stroke-miterlimit:10;\' points=\' -118.5,125.4 -112.7,125.4 -114.6,122.3 -108.9,122.3 -103.5,125.4 -103.5,127.3 -108.9,128.7 -103.5,132.2 -107.3,135.7 -108.9,133.8 -114.7,135.6 -118.5,130.7 \'/%3E%3C/svg%3E");background-size: contain;background-repeat: no-repeat;background-position: center;width: 32px;height: 32px;top: 50%;left: 50%;transform: translate(-50%, -50%);}'
		stringcss += '.asteroid.type-2 {position: absolute;background-image: url("data:image/svg+xml,%3C%3Fxml version=\'1.0\' encoding=\'utf-8\'%3F%3E%3C!-- Generator: auto --%3E%3Csvg version=\'1.1\' id=\'Calque_1\' xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' x=\'0px\' y=\'0px\' viewBox=\'-119 121 16 16\' style=\'enable-background:new -119 121 16 16;\' xml:space=\'preserve\'%3E%3Cpolygon id=\'_x32_\' style=\'fill:none;stroke:%23FFFFFF;stroke-width:0.5;stroke-linecap:square;stroke-linejoin:bevel;stroke-miterlimit:10;\' points=\' -118.5,125.7 -114.9,122.3 -111.1,124 -107.3,122.3 -103.5,125.7 -107.3,127.5 -103.5,130.8 -107.2,135.7 -113,134 -114.9,135.7 -118.5,132.4 -116.7,129 \'/%3E%3C/svg%3E ");background-size: contain;background-repeat: no-repeat;background-position: center;width: 48px;height: 48px;top: 50%;left: 50%;transform: translate(-50%, -50%);}'
		stringcss += '.asteroid.type-3 {position: absolute;background-image: url("data:image/svg+xml,%3C%3Fxml version=\'1.0\' encoding=\'utf-8\'%3F%3E%3C!-- Generator: auto --%3E%3Csvg version=\'1.1\' id=\'Calque_1\' xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' x=\'0px\' y=\'0px\' viewBox=\'-119 121 16 16\' style=\'enable-background:new -119 121 16 16;\' xml:space=\'preserve\'%3E%3Cpolygon id=\'_x33_\' style=\'fill:none;stroke:%23FFFFFF;stroke-width:0.5;stroke-linecap:square;stroke-linejoin:bevel;stroke-miterlimit:10;\' points=\' -118.5,125.7 -114.8,122.3 -111,125.7 -107.3,122.3 -103.5,125.8 -105.4,129 -103.5,132.3 -109.3,135.7 -114.7,135.7 -118.5,132.3 \'/%3E%3C/svg%3E%0A");background-size: contain;background-repeat: no-repeat;background-position: center;width: 64px;height: 64px;top: 50%;left: 50%;transform: translate(-50%, -50%);}'
		stringcss += '@keyframes boom {from {transform: scale(1);opacity: 1;}to {transform: scale(2);opacity: 0;animation-play-state: paused;}}'
		stringcss += '@keyframes init {from {opacity: 0;}to {opacity: 1;}}'

		stringcss += '.ship {opacity: 1; animation: .3s linear init;}'
		stringcss += '.ship.visual {background-image: url("data:image/svg+xml,%3Csvg version=\'1.0\' id=\'ship_1\' xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' x=\'0px\' y=\'0px\' viewBox=\'0 0 8 16\' style=\'enable-background:new 0 0 8 16;\' xml:space=\'preserve\'%3E%3Cstyle type=\'text/css\'%3E.st0%7Bfill:none;stroke:%23FFFFFF;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;%7D%3C/style%3E%3Cpolygon id=\'XMLID_1_\' class=\'st0\' points=\'4,12.7 2.3,12.7 0.5,15.2 4,0.8 7.5,15.2 5.7,12.7 \'/%3E%3C/svg%3E%0A");background-position: center center;background-size: cover;background-repeat:no-repeat}'
		stringcss += '.ship.range {background-color:#202020;}'
		stringcss += '.ship.alerte .range {border: 1px dotted rgba(255, 0, 0, .9);animation: 0.3s linear infinite alerte;opacity: 1;}'
		stringcss += '.ship.explode {background-color:none;animation: 3s linear explode;opacity: 0;}'
		stringcss += '@keyframes explode {from {transform: scale(1) rotate(-360deg);opacity: 1;}to {top:50%;left:50%;transform: scale(18) rotate(360deg);opacity: 0;animation-play-state: paused;}}'

		stringcss += '@keyframes alerte {from {transform: scale(2);opacity: 1;}to {transform: scale(1)opacity: 0;}}'
		stringcss += '#devconsole {z-index:-2000;position: absolute;top: 10px;left: 10px;width: -webkit-max-content;width: -moz-max-content;width: max-content;}'
		stringcss += '#devconsole .devplayer,#devconsole .devship {display:none}'
		stringcss += '#devconsole.active .devplayer,#devconsole.active .devship {display:unset}'
		stringcss += '#devmire {position: absolute;background-image: url("data:image/svg+xml,%3C%3Fxml version=\'1.0\' encoding=\'utf-8\'%3F%3E%3Csvg version=\'1.0\' id=\'mire\' xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' x=\'0px\' y=\'0px\' viewBox=\'0 0 256 256\' style=\'enable-background:new 0 0 256 256;\' xml:space=\'preserve\'%3E%3Cstyle type=\'text/css\'%3E .st0%7Bfill:none;stroke:%23FFFFFF;stroke-width:0.5;stroke-miterlimit:10;%7D%0A%3C/style%3E%3Cline id=\'x\' class=\'st0\' x1=\'128\' y1=\'9.5\' x2=\'128\' y2=\'246.5\'/%3E%3Cline id=\'y\' class=\'st0\' x1=\'246.5\' y1=\'128\' x2=\'9.5\' y2=\'128\'/%3E%3C/svg%3E");background-size: 256px;background-repeat: no-repeat;background-position: center;width: 256px;height: 256px;top: 50%;left: 50%;transform: translate(-50%, -50%);}'
		stringcss += '#devconsole {font-size: min(calc((100vh /100)*1.6 ), 1rem) }'
		stringcss += '.titlebloc {font-size: max(2rem, calc((100vw /100)*3 ))}'
		stringcss += '.subtitle {font-size: max(1rem, calc((100vw /100)*1.5 ))}'

		stringcss += '.shoot {font-size: calc((100vw /100)*1.7 )}'
		stringcss += '.footer {font-size: calc((100vh /100)*1.4 )}'
		stringcss += '.footer2 {font-size: min(.5rem, calc((100vw /100)*1.2 ))}'
		stringcss += '.scorep1,.scorep2 {font-size: calc((100vh /100)*1.1 )}'
		stringcss += '.coins {font-size: calc((100vh /100)*1.1 )}'
		stringcss += '.shoot,.footer,.footer2,.coins,.scorep1,.scorep2,.titlebloc {opacity: 1; animation: 1s linear init;}'


		this.addCss(stringcss, 'main')
	}
	addCss(stringcss, styleid) {
		let style = document.createElement('style');
		style.textContent = stringcss
		style.id = styleid
		document.getElementsByTagName('head')[0].appendChild(style);
	}
	startGame = (nbplayer = false) => {
		if (nbplayer) {

			this.front.removeinfo()
			this.front.createTouch()

			// STARS ?? REALY NOT NEEDED
			// if (this.stars) {
			// 	this.stars.create()
			// 	this.stars.add()
			// }

			// PLAYERS
			if (nbplayer === 1) {
				this.players.create()
			}
			else if (nbplayer === 2) {
				this.players.create()
				this.players.create()
			}
			this.keepPlaying()
		}
	}
	keepPlaying = () => {
		// ASTEROIDS

		//RENDER addship
		this.players.players[this.actualPlayer].ships.addship(this.players.players[this.actualPlayer])
		this.players.players[this.actualPlayer].ships.addtodom()
		// this.setPause()
		//RENDER 
		// this.gameRender = (() => { this.render() }, this.renderInterval);
		this.gameRender = setInterval(() => { this.render() }, this.renderInterval);

		// ASTEROIDS
		this.asteroids.create(this.players.players[this.actualPlayer].lv)
		this.addEventKey()
	}
	render = () => {
		if (!this.isPause && !this.wait) {
			// ASTEROIDS
			this.asteroids.renderAsteroids()
			// PROJECTILS
			this.projectils.renderProjectils()
			// PLAYERS
			this.players.renderPlayer()
		}
	}
	giveDelay = (time) => {
		return new Promise(resolve => setTimeout(resolve, time));
	}
	// starsManager = () => {
	// 	let datas = {
	// 		stars: [],
	// 		add: () => {
	// 			for (let index = 0; index < this.stars.stars.length; index++) {
	// 				this.stars.stars[index].div = this.divMaker('star', this.stars.stars[index]);
	// 				this.stars.addtodom(this.stars.stars[index])
	// 			}
	// 		},
	// 		addtodom: (star) => {
	// 			document.body.appendChild(star.div)
	// 		},
	// 		create: () => {
	// 			let immat = this.stars.stars.length ?? 0
	// 			this.stars.stars.push({
	// 				immat: immat,
	// 				type: 'star',
	// 				visual: '🌟',//🧭
	// 				x: this.center.x,
	// 				y: this.center.y,
	// 				z: this.center.z, // 3d
	// 				w: 48,
	// 				h: 48,
	// 				l: 48, // 3d
	// 				orbitdelay: [0, 50], // current,orbit refreh delay 
	// 				range: { x: 100, y: 100, z: 100 }, // range of orbit effect in pixels
	// 				div: Object
	// 			})
	// 		}
	// 	}
	// 	return datas
	// }
	playersManager = () => {
		let datas = {
			players: [],
			create: () => {
				let immat = (this.players.players.length > 0) ? this.players.players.length : 0
				let newplayer = {
					immat: immat,
					score: 0,
					lifetime: 0,
					gameover: 0,
					lives: 3,
					lv: 0,
					dir: { right: 0, left: 0, up: 0, down: 0 }, // right, left (arrows keys downned)
					type: 'ship',
					ships: this.shipsManager('ship', immat),
					ship: Object,
					currentship: 0,
					resetdir: (player) => {
						player.dir = { right: 0, left: 0 }
					},
					checkdir: (player) => {
						let currentship = player.ship
						currentship.d += player.dir.right === 1 ? currentship.dstep : 0;
						currentship.d -= player.dir.left === 1 ? currentship.dstep : 0;

						if (currentship.d > 360) { currentship.d = currentship.d - 360 }
						else if (currentship.d < 0) { currentship.d = currentship.d + 360 }

						player.resetdir(player)
					},
					changedir: (dir, datas) => {
						let player = this.players.players[this.actualPlayer]
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
				// this.players.players[immat].ships.addship(this.players.players[immat])
			},
			death: () => {
				let player = this.players.players[this.actualPlayer]
				this.players.players[this.actualPlayer].lives -= 1
				let ship = player.ship
				this.wait = true
				clearInterval(this.gameRender);
				ship.div.classList.remove('alerte')
				ship.div.classList.add('explode')
				this.asteroids.clearAsteroids()


				this.giveDelay(3000).then(() => {
					let player = this.players.players[this.actualPlayer]
					let ship = player.ship
					ship.div.remove()

					let nextplayerimmat = this.players.getNextPlayerWithLives()

					console.log('nextplayerimmat')
					console.log(nextplayerimmat)
					if (nextplayerimmat === false) {
						console.log('game OVERRRRRRRRRRRRR:')
					}
					else {
						console.log('nextplayerimmat:' + nextplayerimmat)
						this.actualPlayer = nextplayerimmat
					}
					console.log('next:' + nextplayerimmat)
					console.log('giveDelay this.actualPlayer :' + this.actualPlayer + ' died')
					console.log('giveDelay player.immat :' + player.immat)
					console.log('giveDelay player.lives:' + player.lives)

					// // test if more than 1 player
					// if (this.players.players.length > 1) {
					// 	this.actualPlayer += 1;
					// 	if (this.actualPlayer >= this.maxPlayer) {
					// 		this.actualPlayer = 0
					// 	}
					// }
					// player = this.players.players[this.actualPlayer]
					// ship = player.ship
					// // test player lives
					// if (this.players.players[this.actualPlayer].lives > 0) {
					// 	player = this.players.players[this.actualPlayer]
					// 	console.log(player)
					// }
					// else {
					// 	// gam over this player
					// 	console.log('--------------------game over this player')
					// 	player.gameover = true
					// 	this.wait = true
					// }

					this.wait = false
					this.keepPlaying()
				});
			},
			getNextPlayerWithLives: () => {
				let nblivespositiv = 0
				let nbreponse = 0
				let stop = false
				this.players.players.forEach(player => {
					if (player.lives > 0) { nblivespositiv++ }
					if (player.lives > 0 && stop != true) {
						stop = true
						console.log('--------------------------------------lives:' + player.lives)
						console.log('----------------------------------------player.immat:' + player.immat)

						if (player.immat > this.actualPlayer) {
							nbreponse++
							console.log(player.immat, this.actualPlayer, player.lives)
						}
					}
				});
				if (nbreponse > 0) {
					return nbreponse
				}
				else {
					if (nblivespositiv > 0) {
						this.players.players.forEach(player => {
							if (player.lives > 0) {
								return player.immat
							}
						})
						return false
					}
					else {
						return false
					}
				}
			},
			renderPlayer: () => {
				let player = this.players.players[this.actualPlayer]
				if (player.ship) {
					if (player.ship.mods) {
						player.ships.shootRefreshDelay(player, player.ship)
						player.checkdir(player)
						this.players.check_PlayerMoves(player)
						this.players.check_ShipPos(player)
						this.players.update_ShipDivPos(player)
						this.devTools.refreshconsole(player)
					}
					else this.devTools.setBugAndPause('ship have no mods define');
				}
				else this.devTools.setBugAndPause('no ships define');
			},
			check_ShipPos: (player) => { // check out screen position
				let ship = player.ship
				if (ship.mods.moves[ship.mods.move] != 'orbit') {
					if (ship.x > (this.screen.w + (ship.w / 2))) { ship.x = 1 }
					if (ship.y > (this.screen.h + (ship.h / 2))) { ship.y = 1 }
					if (ship.z > (this.screen.l + (ship.l / 2))) { ship.z = 1 } // 3d
					if (ship.x < (0 - (ship.w / 2))) { ship.x = this.screen.w - 1 }
					if (ship.y < (0 - (ship.h / 2))) { ship.y = this.screen.h - 1 }
					if (ship.z < (0 - (ship.l / 2))) { ship.z = this.screen.h - 1 } // 3d
				}
			},
			update_ShipDivPos: (player) => {
				let ship = player.ship
				ship.div.style.left = ((ship.x - (ship.w / 2))) + 'px'
				ship.div.style.top = ((ship.y - (ship.h / 2))) + 'px'
				ship.div.style.zIndex = ((ship.z - (ship.l / 2))) // 3d
				// (have to clean my mind with the mess radian/degrees & and html rotate
				// html/css = 0deg for north
				// and js math = -90 for north WTF ?? 
				ship.div.style.transform = 'rotate(' + (ship.d + 90) + 'deg)'
			},
			check_PlayerMoves: (player) => {
				let ship = player.ship
				// let distance = this.getDistance(player,star)
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
					ship.x = parseInt((ship.x + (speed * Math.cos((d) * (Math.PI / 180)))) * 100) / 100
					ship.y = parseInt((ship.y + (speed * Math.sin((d) * (Math.PI / 180)))) * 100) / 100
				}
				else if (ship.mods.move === 1) { // nogravity ??
					// to do
					ship.x = parseInt((ship.x + (speed * Math.cos((d) * (Math.PI / 180)))) * 100) / 100
					ship.y = parseInt((ship.y + (speed * Math.sin((d) * (Math.PI / 180)))) * 100) / 100
				}
				else if (ship.mods.move === 2) { // ia
					// to do
				}
				else if (ship.mods.move === 3 && this.stars) { // orbit
					let star = this.stars.stars[0]
					// star center pos
					let starx = star.x + (star.w / 2)
					let stary = star.y + (star.h / 2)
					let starw = star.range.x / 2
					let starh = star.range.y / 2
					let starl = star.range.z / 2 // z-index
					// new pos
					let x2 = 0
					let y2 = 0
					let distance = this.getDistance(player, star)
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
		}
		return datas
	}
	asteroidsManager = () => {
		let data = {
			kills: 0,
			asteroids: [],
			asteroidstodelete: [],
			max: 8,
			speeds: { 0: 5 },
			create: (e) => {
				for (let i = 0; i < this.asteroids.max; i++) {
					let immat = this.asteroids.asteroids.length
					let asteroid = {
						immat: immat,
						speed: 2,
						type: 'asteroid',
						x: 32,// - ( ship.w/2),
						y: 32,// - ( ship.h/2),
						z: 32,// - ( ship.l/2), // 3d
						w: 32,
						h: 32,
						l: 32, // 3d
						d: this.aleaEntreBornes(1, 360),
						range: { x: 32, y: 32, z: 32 }, // range 
						pts: 100,
						lv: 1,//this.aleaEntreBornes(1, 3),
						div: Object,
						nearest: false
					}
					this.asteroids.addtostack(asteroid)
				}
			},
			addtostack: (asteroid) => {
				asteroid.div = this.divMaker(asteroid.type, asteroid, false)
				this.asteroids.asteroids.push(asteroid)
				this.asteroids.addtodom(asteroid)
			},
			addtodom: (asteroid) => {
				document.body.appendChild(asteroid.div)
			},
			renderAsteroids: () => {
				// let nearestAsteroidImmat = false
				let asteroidIndex = false
				let smallestDistance = 999999
				let asteroidkey = 0
				let player = this.players.players[this.actualPlayer]
				let ship = player.ship
				if (this.asteroids.asteroids.length > 0 && !this.isPause) {

					//-- forEach asteroid
					this.asteroids.asteroids.forEach(asteroid => {
						// get nearest asteroid from ship
						asteroid.div.classList.remove('nearest')
						ship.div.classList.remove('alerte')
						asteroid.nearest = false
						ship.alerte = false
						let distance = this.getDistance(asteroid, ship)
						if (distance < smallestDistance) {
							smallestDistance = distance
							// nearestAsteroidImmat = asteroid.immat
							asteroidIndex = asteroidkey
						}
						// check collision in case any projectils exist
						if (this.projectils.projectils.length > 0) {
							this.asteroids.check_collisions_projectils(asteroidkey)
						}
						// update div pos
						this.asteroids.update_DivPos(asteroid)
						asteroidkey++
					})
				}
				//  if nearest asteroid still exist
				if (asteroidIndex >= 0 && this.asteroids.asteroids[asteroidIndex]) {
					this.asteroids.asteroids[asteroidIndex].nearest = true
					this.asteroids.asteroids[asteroidIndex].div.classList.add('nearest')
					this.asteroids.check_collisions_ship(asteroidIndex)
					asteroidIndex = false
				}
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
			check_collisions_projectils: (asteroidkey) => {
				let asteroid = this.asteroids.asteroids[asteroidkey]
				// 💡 an idea to make it better ???
				// collision is true if distance from objects centers is less than both half width's objects summed
				// CHECK COLLiSION with projectils
				if (this.projectils.projectils.length > 0) {
					let projectilIndex = 0
					this.projectils.projectils.forEach(projectil => {
						let distance = this.getDistance(asteroid, projectil);
						if (distance < ((projectil.w / 2) + (asteroid.w / 2))) {
							asteroid.explode = true
							asteroid.div.classList.add('unarmed')
							asteroid.div.textContent = "BOOM"


							// console.log('dead asteroid immat:' + asteroid.immat)


							this.front.addScore(asteroid)
							this.projectils.addToDeleteList(projectilIndex)
							this.asteroids.addToDeleteList(asteroidkey)
						}
						// delete asteroids from array
						this.asteroids.clearDeleteList()
						projectilIndex++
					})
				}

			},
			check_collisions_ship: (asteroidIndex) => {
				let asteroid = this.asteroids.asteroids[asteroidIndex]
				let player = this.players.players[this.actualPlayer]
				let ship = player.ship
				// console.log()
				let distance = this.getDistance(asteroid, ship);
				let alertedistancebeforecolliding = 20 // pixels
				let deadrange = ((ship.w / 2) + (asteroid.w / 2))
				let alerterange = deadrange + alertedistancebeforecolliding



				// if (!asteroid.explode) {
				// alerte distance

				if ((distance) < alerterange) {
					ship.div.classList.add('alerte')
					// console.log('alerte:' + asteroid.immat)
				}
				else {
					ship.div.classList.remove('alerte')
				}
				// colliding
				if (distance < deadrange) {
					console.log(' 1 -----------')
					console.log('normal death')
					console.log('distance < deadrange')
					console.log(distance, deadrange)
					console.log(asteroid, ship)
					this.players.death(asteroidIndex)
					// this.asteroids.addToDeleteList(asteroidIndex)
				}
				// delete asteroids from array
				// this.asteroids.clearDeleteList()
				// }
			},
			addToDeleteList: (asteroidIndex) => {
				this.asteroids.asteroidstodelete.push(asteroidIndex)
			},
			clearDeleteList: () => {
				// delete asteroids
				if (this.asteroids.asteroidstodelete.length > 0) {
					this.asteroids.asteroidstodelete.forEach(asteroidIndex => {
						this.asteroids.asteroids[asteroidIndex].div.remove()
						this.asteroids.asteroids.splice(asteroidIndex, 1);
					})
					this.asteroids.asteroidstodelete = []
				}
			},
			clearAsteroids: () => {
				this.asteroids.asteroids.forEach(element => { element.div.remove() });
				this.asteroids.asteroids = []
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
				projectil.div = this.divMaker(projectil.type, projectil, player)
				this.projectils.projectils.push(projectil)
				this.projectils.update_DivPos(projectil)
				this.projectils.addtodom(projectil)
			},
			addtodom: (projectil) => {
				document.body.appendChild(projectil.div)
			},
			create: (type, player) => {
				let immat = this.projectils.projectils.length
				let ship = player.ship
				let projectil = {
					immat: immat,
					playerimmat: player.immat,
					d: ship.d,
					speed: ship.speed > 0 ? ship.speed + (20 - ship.speed) : 20,
					x: ship.x,// + (ship.w / 2),
					y: ship.y,// + (ship.h / 2),
					z: ship.z,// + (ship.l / 2), // 3d
					lifedelay: { current: 0, max: 40 },
					w: 16,
					h: 16,
					l: 16, // 3d
					type: type,
					visual: '|',//🧊
					orbitdelay: [0, 50], // current,orbit refreh delay 
					range: { x: 16, y: 16, z: 16 }, // range
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
			addToDeleteList: (projectilIndex) => {

				let projectil = this.projectils.projectils[projectilIndex]
				projectil.div.remove()
				this.projectils.projectilstodelete.push(projectilIndex)
			},
			clearDeleteList: () => {
				// delete projectil
				if (this.projectils.projectilstodelete.length > 0) {
					this.projectils.projectilstodelete.forEach(projectilIndex => {
						this.projectils.projectils.splice(projectilIndex, 1);
					})
					this.projectils.projectilstodelete = []
				}
			},
			renderProjectils: () => {
				if (this.projectils.projectils.length > 0) {
					let projectilIndex = 0
					this.projectils.projectils.forEach(projectil => {
						if (projectil.lifedelay.current <= projectil.lifedelay.max) {
							this.projectils.update_DivPos(projectil)
							projectil.lifedelay.current += 1
						}
						else {
							this.projectils.addToDeleteList(projectilIndex)
						}
						projectilIndex++
					});
					// delete projectil
					this.projectils.clearDeleteList()
				}
			}
		}
		return data;
	}
	shipsManager(type = false, playerimmat) {
		let data = {
			ship: Object,
			ships: [],
			type: type ?? 'ship',
			addship: (player) => {
				let newship = player.ships.getnewship(player)
				player.ship = newship
				// player.ships.ships.push(newship)
				console.log('newship', newship)
			},
			addtodom: () => {
				// this.players.players[this.actualPlayer].ship.div.textContent = this.players.players[this.actualPlayer].ship.visual
				// let player = this.players.players[playerimmat]
				let player = this.players.players[this.actualPlayer]
				let ship = player.ship
				document.body.appendChild(ship.div)
			},
			changespeed: (dir) => {
				let player = this.players.players[this.actualPlayer]
				let ship = player.ship
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
			shootRefreshDelay: (player, ship) => {
				if (ship.delayshoot.current > 0) {
					ship.delayshoot.current += 1
				}
				if (ship.delayshoot.current >= ship.delayshoot.max) {
					ship.delayshoot.current = 0
				}
			},
			shoot: (type) => {
				if (!this.isPause && !this.wait) {
					let player = this.players.players[this.actualPlayer]
					let ship = player.ship
					if (ship.delayshoot.current < 1) {
						ship.delayshoot.current = 1
						this.projectils.create(type, player)
					}
				}
			},
			getnewship: (player) => {
				player = this.players.players[player.immat]
				this.shipList += 1
				let newshipimmat = this.shipList
				console.log('getnewship newshipimmat:' + newshipimmat)
				let ship = {
					type: 'ship',
					immat: newshipimmat,
					dstep: 15, // rotation steps for changedir()
					d: -90,
					speed: 0,
					speedrange: { min: -2, max: 20 },
					x: this.center.x,
					y: this.center.y,
					z: this.center.z, // 3d
					w: 8,
					h: 16,
					l: 8, // 3d
					tetha: 0,
					immunity: { active: true, delay: 0, maxdelay: 5000 },
					delayshoot: { current: 0, max: 12 },
					range: { x: 40, y: 40, z: 40 }, // range 
					div: Object,
					mods: {
						limit: 0,
						limits: ['mirrored', 'test'],
						move: 0,
						moves: ['nogravity', 'polar', 'ia', 'orbit', 'normal'],
						next: (modename) => { // l
							let player = this.players.players[this.actualPlayer]
							let ship = player.ship
							ship.mods[modename] =
								ship.mods[modename] < ship.mods[modename + 's'].length - 1
									? ship.mods[modename] += 1
									: 0;
							// console.log('mods:' + ship.mods[modename], ship.mods[modename + 's'][ship.mods[modename]])
						},
						preview: (modename) => { // o key
							let player = this.players.players[this.actualPlayer]
							let ship = player.ship
							ship.mods[modename] =
								ship.mods[modename] > 0
									? ship.mods[modename] -= 1
									: ship.mods[modename + 's'].length - 1;
							// console.log('mods:' + ship.mods[modename], ship.mods[modename + 's'][ship.mods[modename]])
						}
					},
				}
				ship.div = this.divMaker('ship', ship, player)
				return ship
			}
		}
		return data
	}
	addEventKeyHelp() {
		document.onkeydown = (eventkeydown) => {
			if (eventkeydown.key === "i") { this.setDisplayInfo() }
			if (eventkeydown.key === "&" || eventkeydown.key === "1") { this.startGame(1) }
			if (eventkeydown.key === "é" || eventkeydown.key === "2") { this.startGame(2) }
			if (eventkeydown.key === "c") { this.front.addCoin() }
			if (eventkeydown.key === "n") { ship.mods.next('move') }
			if (eventkeydown.key === "j") { ship.mods.preview('move') }
			if (eventkeydown.key === "l") { ship.mods.next('limit') } // 3d
			if (eventkeydown.key === "k") { ship.mods.preview('limit') }
			if (eventkeydown.key === "v") { this.setVisualHelp() }
		}
		if (document.getElementById('devconsole')) {
			document.getElementById('devconsole').addEventListener('click', (event) => {
				this.setDisplayInfo()
			})
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
	addEventKey() {
		document.onkeydown = (eventkeydown) => {
			let player = this.players.players[this.actualPlayer]
			let ship = player.ship

			if (eventkeydown.key === "i") { this.setDisplayInfo() }
			if (eventkeydown.key === "p") { this.setPause() }
			if (eventkeydown.key === "v") { this.setVisualHelp() }

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
	aleaEntreBornes(minimum, maximum) {
		return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
	}
	setPause() {
		this.isPause = !this.isPause
	}
	setVisualHelp() {
		this.isVisualHelp = !this.isVisualHelp
		if (this.isVisualHelp) {
			let visual = '.ship.range {border: 1px dotted rgba(0, 255, 0, 1);}'
			visual += '.ship {}'
			visual += '.asteroid.range {border: 1px dotted rgba(0, 255, 0, 1);}'
			visual += '.projectil.range {background-color:rgba(0, 255, 0, 1);border: 1px dotted rgba(0, 255, 0, 1);}'
			visual += '*,fill {color:yellow;}'
			this.addCss(visual, 'visual')
		}
		else {
			document.getElementById('visual').remove()
		}
	}
	setDisplayInfo() {
		this.isDisplayInfo = !this.isDisplayInfo
		if (this.isDisplayInfo) {
			document.getElementById('devconsole').classList.add('active')
		}
		else {
			document.getElementById('devconsole').classList.remove('active')
		}
	}
	getDistance = (a, b) => { // get hypotenus with pythaGore
		let AB = (a.x + (a.w / 2)) - (b.x + (b.w / 2))
		let AC = (a.y + (a.h / 2)) - (b.y + (b.h / 2))
		return Math.sqrt((AB * AB) + (AC * AC))
	}
	getDevTools = () => {
		return {
			refreshconsole: (player) => { // dev tools only // remove this if on prod
				let ship = player.ship
				let nbAsteroids = this.asteroids.asteroids.length
				let nbProjectils = this.projectils.projectils.length
				if (document.getElementById('devconsole')) {
					document.getElementById('devplayerimmat').textContent = 'playerimmat:' + this.actualPlayer//player.immat

					document.getElementById('devlives').textContent = 'lives:' + player.lives
					document.getElementById('devscore').textContent = 'score:' + player.score
					document.getElementById('devlv').textContent = 'lv:' + player.lv

					document.getElementById('devx').textContent = 'x:' + ship.x
					document.getElementById('devy').textContent = 'y:' + ship.y
					document.getElementById('devz').textContent = 'z:' + ship.z
					document.getElementById('devd').textContent = 'd:' + ship.d + '°'

					document.getElementById('devspeed').textContent = 'speed:' + ship.speed
					document.getElementById('devmove').textContent = 'move:' + ship.mods.move + " [" + ship.mods.moves[ship.mods.move] + ']'
					document.getElementById('devlimit').textContent = 'limit:' + ship.mods.limit + " [" + ship.mods.limits[ship.mods.limit] + ']'
					document.getElementById('devdir').textContent = 'dir:' + player.dir.right + ',' + player.dir.left
					document.getElementById('devasteroids').textContent = 'asteroids[]:' + nbAsteroids
					document.getElementById('devprojectils').textContent = 'projectils[]:' + nbProjectils
					document.getElementById('devvisualhelp').textContent = '[v] Visual Help ?? [' + (this.isVisualHelp ? 'On' : 'Off') + ']'
				}
			},
			setBugAndPause: (string = false) => {
				this.isBug = true
				this.isPause = true
				if (this.isBug && this.isPause) {
					console.log('🐛 bug ! game paused')
					if (string) { console.log('🐛', string) }
				}
			}
		}
	}
}
let isLoaded = () => {
	let AsteroidGame = new Asteroid()
}
window.addEventListener('load', isLoaded, false)
