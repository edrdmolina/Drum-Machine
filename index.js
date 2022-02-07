const bankOne = [
    {
      keyCode: 81,
      keyTrigger: 'Q',
      id: 'Heater-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
      keyCode: 87,
      keyTrigger: 'W',
      id: 'Heater-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
      keyCode: 69,
      keyTrigger: 'E',
      id: 'Heater-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
      keyCode: 65,
      keyTrigger: 'A',
      id: 'Heater-4',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
      keyCode: 83,
      keyTrigger: 'S',
      id: 'Clap',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
      keyCode: 68,
      keyTrigger: 'D',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
      keyCode: 90,
      keyTrigger: 'Z',
      id: "Kick-n'-Hat",
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
      keyCode: 88,
      keyTrigger: 'X',
      id: 'Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
      keyCode: 67,
      keyTrigger: 'C',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  ];
  
  const bankTwo = [
    {
      keyCode: 81,
      keyTrigger: 'Q',
      id: 'Chord-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    },
    {
      keyCode: 87,
      keyTrigger: 'W',
      id: 'Chord-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
    },
    {
      keyCode: 69,
      keyTrigger: 'E',
      id: 'Chord-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
    },
    {
      keyCode: 65,
      keyTrigger: 'A',
      id: 'Shaker',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
    },
    {
      keyCode: 83,
      keyTrigger: 'S',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
    },
    {
      keyCode: 68,
      keyTrigger: 'D',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
    },
    {
      keyCode: 90,
      keyTrigger: 'Z',
      id: 'Punchy-Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
    },
    {
      keyCode: 88,
      keyTrigger: 'X',
      id: 'Side-Stick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
    },
    {
      keyCode: 67,
      keyTrigger: 'C',
      id: 'Snare',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
    }
  ];
  
  // render one drumpad and produces sound
  class DrumPad extends React.Component {
    constructor(props) {
      super(props); 
      this.state = {
        isActive: false,
      };
      this.playSound = this.playSound.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this);
      this.toggleDrumpadActivity = this.toggleDrumpadActivity.bind(this);
    }
    
    componentDidMount() {
      document.addEventListener('keydown', this.handleKeyPress);
    }
    
    componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyPress);
    }
    
    handleKeyPress(e) {
      if(e.keyCode === this.props.drumpad.keyCode) {
        this.playSound();
      }
    }
    
    playSound() {
      if(this.props.power) {
        const { keyTrigger, id } = this.props.drumpad;
        const sound = document.getElementById(this.props.drumpad.keyTrigger);
        sound.currentTime = 0;
        sound.play();
        this.toggleDrumpadActivity()
        this.props.updateDisplay(id);
        setTimeout(() => this.toggleDrumpadActivity(), 100)
      } else return;
    }
    
    toggleDrumpadActivity() {
      this.setState(cs => ({
        isActive: !cs.isActive
      }))
    }
    
    render() {
      const { url, keyTrigger, id } = this.props.drumpad;
      const { isActive } = this.state;
      const { playSound } = this;
      return (
        <div 
          className={ `drum-pad ${isActive ? 'active-drumpad' : ''}` } 
          id={id} 
          onClick={playSound}
          >
          <audio className='clip' src={url} id={keyTrigger} />
          {keyTrigger}
        </div>
      )
    }
  }
  
  // holds all drum pads
  class Keypad extends React.Component {
    render() {
      const { bank, updateDisplay, power } = this.props;
      let keys;
      bank ? (
        keys = bankOne.map((drumpad, idx) => {
          return (
            < DrumPad 
              key={idx} 
              drumpad={drumpad} 
              updateDisplay={updateDisplay} 
              power={power} 
            />
          )
        })
      ) : (
        keys = bankTwo.map((drumpad, idx) => {
          return (
            < DrumPad 
              key={idx} 
              drumpad={drumpad} 
              updateDisplay={updateDisplay} 
              power={power} 
            />
          )
        })
      )
      return(
        <div className='keypad-container'>
          {keys}
        </div>
      )
    }
  }
  
  // changes settings
  class Controls extends React.Component {
    render () {
      const { powerToggle, bankToggle, power, bank, display } = this.props;
      return (
        <div className='controls-container'>
          <h1>Drum Machine</h1>
          <div className='switch-container'>
            <span>Off</span>
            <div className='switch' id='power-switch' onClick={powerToggle}>
              <div className={power ? 'active-switch' : ''}></div>
            </div>
            <span>On</span>
          </div>
          <div id='display'>{display}</div>
          <div className='switch-container'>
            <span>Chord</span>
            <div className='switch' id='bank-switch' onClick={bankToggle}>
              <div className={bank ? 'active-switch' : ''}></div>
            </div>
            <span>Heater</span>
          </div>
        </div>
      )
    }
  }
  
  // The drum machine
  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        power: true,
        bank: true,
        display: ''
      };
      this.powerToggle = this.powerToggle.bind(this);
      this.bankToggle = this.bankToggle.bind(this);
      this.updateDisplay = this.updateDisplay.bind(this);
    }
    
    powerToggle() {
      this.setState(cs => ({ 
        power: !cs.power,
        display: cs.power ? 'Power Off' : 'Power On'
      }))
    }
    
    bankToggle() {
      this.setState(cs => ({ 
        bank: !cs.bank,
        display: cs.bank ? 'Chord Bank' : 'Heater Bank'
      }))
    }
    
    updateDisplay(text) {
      this.setState({ display: text })
    }
    
    render() {
      
      return (
        <div id='drum-machine'>
          < Keypad 
            {...this.state}
            updateDisplay={this.updateDisplay}
          />
          < Controls 
            {...this.state} 
            powerToggle={this.powerToggle} 
            bankToggle={this.bankToggle} 
            updateDisplay={this.updateDisplay}
          />
        </div>
      )
    }
  }
  
  ReactDOM.render(<App/>, document.getElementById('root'));