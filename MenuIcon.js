
class MenuIcon extends HTMLElement
{
	static getStyle()
	{
		let style = document.createElement('style');
		style.innerHTML = `
			menu-icon {
				display: inline-block;
				width: 30px;
				height: 30px;
				position: relative;
				cursor: pointer;
			}
			menu-icon > div {
				width: 100%;
				height: 2px;
				background-color: black;
				margin: 6px 0;
				transition: all 0.3s ease;
				position: relative;
			}

			menu-icon[collapsed="true"] > div {
				/* uncollapsed 30px width 30px height; use pythagorean theorem to find an approximate 42.212 px*/
				width: 42.212px;
				position: absolute;
				top: 0;
				margin: 0;
			}

			menu-icon[collapsed="true"] > div:nth-child(1) {
				transform: rotate(45deg);
				transform-origin: left;
				left: 0;
			}

			menu-icon[collapsed="true"] > div:nth-child(2) {
				transform: rotate(-45deg);
				transform-origin: right;
				right: 0;
			}

			menu-icon[collapsed="true"] > div:nth-child(3) {
				display: none;
			}
		`;
		return style;
	}
	
	get collapsed()
	{
		if (this.getAttribute('collapsed') == 'true')
			return true;
		else
			return false;
	}
	
	set collapsed(value)
	{
		if (value == true)
			this.setAttribute('collapsed', 'true');
		else if (value == false)
			this.setAttribute('collapsed', 'false');
		else
		{
			console.warn("setting MenuIcon object's .collapsed property to unknown value of " + value);
			this.setAttribute('collapsed', 'undefined');
		}
	}
	
	constructor()
	{
		super();
		this.addEventListener('click', event => this.toggleCollapse());
	}
	
	connectedCallback()
	{
		for (let i = 0; i < 3; i++)
			this.append(document.createElement('div'));
		let style = MenuIcon.getStyle();
		this.append(style);
	}
	
	toggleCollapse()
	{
		this.collapsed = !this.collapsed;
	}
}

customElements.define('menu-icon', MenuIcon);