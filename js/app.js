// anowak@ola.mitspace.dk
var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');

// class for storing triangle information
class Triangle {
	name: string;
	image: string; // when adding new triangle types, include .png image with the same name in /image folder
	alt: string;
	toolTip: string; // not in use, can be description of a triangle type

	constructor(name){
		this.name = name==undefined ? "": name; 
		if(name == undefined){
			name = "default";
		}
		this.toolTip = "";
		this.alt = name + " triangle image";
		this.image = "image/" + name + ".png";
	}
}

// check triangle type, return default when cannot calculate
var calculateTriangle= function(sideA, sideB, sideC) {
	if(( sideA && sideB && sideC) > 0 ){
		var equalA = [sideB, sideC].indexOf(sideA) > -1;
		var equalB = sideB === sideC;
		return equalA && equalB ? new Triangle("equilateral") : (equalA || equalB) ? new Triangle("isolesce"): new Triangle("scalene");
	}else{
		return new Triangle();
	}
};

class TriangleChecker extends React.Component {
    constructor() {
		super();
		this.state = {
			fields: { a: 0, b:0, c:0},
			errors: {}
		}
		this.handleChange = this.handleChange.bind(this);
		this.clear = this.clear.bind(this);
    };

    handleChange(e) {
		let fields = this.state.fields;
		fields[e.target.name] = this.validateField(e.target.name, e.target.value) ? e.target.value : "";
		this.setState({
			fields
		});
    }
    
	// ensure that only positive integers are used for triangle sides
    validateField(name, val) {
      let errors = {};
      let isValid = true;
      
      if (val<=0 || val.match(/\D+/)) {
        isValid = false;
        errors[name] = "*Please use positive integers";
      }

      this.setState({
        errors: errors
      });
      return isValid;
    }

    clear(){
		 let fields = { a: 0, b: 0, c: 0};
         this.setState({fields: fields});
	}
	
    render() {
        var triangle = calculateTriangle(this.state.fields.a, this.state.fields.b, this.state.fields.c);
        return (
            <div className="content flex-container">
                <form data-ts="Form" className="ts-form" action="javascript:void(false);">
                    <fieldset className="ts-fieldset">
						<label>
							<span>Side a:</span>
							<input  type="number" name="a" value={this.state.fields.a} onChange={this.handleChange}/>
						</label>
						 <div className="errorMsg">{this.state.errors.a}</div>
					</fieldset>
					<fieldset className="ts-fieldset">
						<label>
							<span>Side b:</span>
							<input  type="number" name="b" value={this.state.fields.b} onChange={this.handleChange}/>
						</label>
						 <div className="errorMsg">{this.state.errors.b}</div>
					</fieldset>
					<fieldset className="ts-fieldset">
						<label>
							<span>Side c:</span>
							<input  type="number" name="c" value={this.state.fields.c} onChange={this.handleChange}/>
						</label>
						 <div className="errorMsg">{this.state.errors.c}</div>
					</fieldset>
                    {triangle.name.length>0 ? 
						<button data-ts="Button" class="ts-primary" onClick={this.clear}>
							<span>Clear</span>
						</button> 
					: ""}
				</form>
                <div className="result">Triangle type: 
					<div>
						<img className="ts-userimage" src={triangle.image} alt={triangle.alt}/>
						<label>{triangle.name}</label>
					</div>
                </div>
            </div>
        );
    }
}

var Header = createReactClass({
    render: function () {
        return (
            <header>
                <h1>{this.props.title}</h1>
            </header>
        );
    }
});

var App = createReactClass({
    render: function () {
        return (
            <div>
                <Header title="Triangle checker"/>
                <TriangleChecker />
            </div>
        );
    }
});

ReactDOM.render(<App/>,  document.getElementById("app"));
