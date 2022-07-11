module.exports = class Utils{
  static createElementDom = (props)=>{
    let {className,id,style,img,element} = props;
    let newElement =document.createElement(element);

    // Set Classname split string
    className= className ?
    className.split(" ").forEach((obj,key)=>{
      newElement.classList.add(obj)
    }):false;


    newElement.id = id ;

    //If have style object , separate keys and values and set in the new element
    if(style){
      let styleKeys =Object.keys(style);
      let styleValues =Object.values(style);
      for (let sec =0;styleKeys.length > sec ;sec++) {
        newElement.style[styleKeys[sec]]=styleValues[sec];
      }
    }

    return newElement
  }
}
