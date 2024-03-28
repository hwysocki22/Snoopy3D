AFRAME.registerComponent('flying-snoopy', {
    init: function () {
      // Solution for Handling Events.
      var sceneEl = document.querySelector('a-scene'); 
      var dogHouseEl = sceneEl.querySelector('#dogHouse')
      var clickCount = 0;

    // sleep function to slow down Snoopy's upward movement
    const sleep = (time) => {
        return new Promise(resolve => setTimeout(resolve, time))
    }
      // on click, Snoopy will fly up
      sceneEl.addEventListener('click', async () => {
        clickCount++
        for (let i = 0; i < 100; i++){
          if (clickCount <= 2 && clickCount >= 0) {
          //increases Snoopy's X and Y coordinates every 10 steps of the loop 
          //until he reaches the clouds
            if (i % 10 == 0 && dogHouseEl.getAttribute("position").y <= 20) {
                let posY = dogHouseEl.getAttribute("position").y + 1;
                let posX = dogHouseEl.getAttribute("position").x - .3;
                dogHouseEl.setAttribute("position", posX + " " + posY + " 0");  
            } else {
              // if not increasing Snoopy's position, wait to start next loop
              //helps him increase gradually
                await sleep(5);
            }
          } else {
            //returns Snoopy to the ground by decreasing his Y coordinates 
            //until he reaches the ground
              clickCount = -2;
              if (i % 10 == 0 &&  dogHouseEl.getAttribute("position").y > 0) {
                let posY = dogHouseEl.getAttribute("position").y - 1;
                let posX = dogHouseEl.getAttribute("position").x - .5;
                dogHouseEl.setAttribute("position", posX + " " + posY + " 0");  
            } else {
              await sleep(5);
            }
          }
        }
      });
    }
})