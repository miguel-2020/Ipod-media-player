function volumeKnob() {
  let prevX = 0;
  let prevY = 0;
  let volume = 0;

  function run(event) {
    // get the properties of the knob
      const knobInfo = event.target.getBoundingClientRect();
      // get the initial coordinates of the knob  box
      const knobCenterX = knobInfo.width / 2;
      const knobCenterY = knobInfo.height / 2;
    
      // se the mouse coordinates to be withing the knob box.
      const mouseX = event.clientX - knobInfo.x;
      const mouseY = event.clientY - knobInfo.y;


    
      // increase and decrease the audio base of the quadrants of the x and y coordinates
      // top right quadrant
      if (mouseX > knobCenterX && mouseY < knobCenterY) {
        if (prevX <= mouseX && prevY <= knobCenterY) {
          volume++;
        } else if (prevX >= mouseX && prevY >= knobCenterY) {
          volume--;
        }
    
        // bottom right quadrant
      } else if (mouseX > knobCenterX && mouseY > knobCenterY) {
        if (prevX >= mouseX && prevY <= mouseY) {
          volume++;
        } else if (prevX <= mouseX && prevY >= mouseY) {
          volume--;
        }
    
        //bottom left quadrant
      } else if (mouseX < knobCenterX && mouseY > knobCenterY) {
        if (prevX >= mouseX && prevY >= mouseY) {
          volume++;
        } else if (prevX <= mouseX && prevY <= mouseY) {
          volume--;
        }
    
        // top left quadrant
      } else if (mouseX < knobCenterX && mouseY < knobCenterY) {
        if (prevX <= mouseX && prevY >= mouseY) {
          volume++;
        } else if (prevX >= mouseX && prevY <= mouseY) {
          volume--;
        }
      }
    

      // get the delta values and calculate the angle in radiant
      const deltaX = knobCenterX - mouseX;
      const deltaY = knobCenterY - mouseY;
    
      const rad = Math.atan2(deltaY, deltaX);
     
    
      // convert radiant angle to degree notation
      const degree = Math.ceil(rad * (180 / Math.PI));
    
      // make the knob rotate by increasing the custom property --amount
      if(degree){
        event.target.style.setProperty('--amount', degree + 'deg');
      }
      
    
      if (volume < 0) {
        volume = 0;
      } else if (volume > knobInfo.width) {
        volume = knobInfo.width - 4;
      }
    
      prevX = mouseX;
      prevY = mouseY;
    
      // return the volume as a percentage
     let percentage =  Math.floor(100 * volume / knobInfo.width)


      return percentage
  }

  return run
}

export default volumeKnob