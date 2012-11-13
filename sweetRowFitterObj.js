var sweetRowFitterObj = {};
(function(){
  function checkEven( num, max ) {
    for( var i = max; i > 1; i-- ) {
      if( num % i === 0 ) return i;
    }
    return 0;
  }
  
  sweetRowFitterObj = function( desired, min, max ) {
    var group = {},
        sweet = max * ( max - 3 ),
        remainder = desired;
        
    if( desired < sweet ) {
      var even = checkEven( desired, max );
      if( even ) {
        var count = desired / even,
            result = {};
        
        result[ even ] = count;
        return result;
      }
    }        
        
    if( desired >= max ) {
      var rowsForMax = rowsOfSizeXForYItems( max, desired );        
      group[ max ] = rowsForMax;
      remainder -= rowsForMax * max;        
    }
    
    function getForX( x ) {
      var rowsForCurrent = Math.floor( remainder / x ); 
      group[ x ] = rowsForCurrent;
      remainder -= rowsForCurrent * x;
    }

    for( var i = max - 1; i > 0; i-- ) {
      getForX( i );
      if( remainder <= 0 ) break;
    }
    
    return group;
  }
  
  function rowsOfSizeXForYItems( x, y ) {
    var nextHighest = Math.ceil( y / x ) * x,
        nextHighestFactor = nextHighest / x,
        distance = nextHighest - y,
        count = nextHighestFactor - distance;
        
    count = count < 0 ? 0 : count;
    
    return count;
  }  
})();