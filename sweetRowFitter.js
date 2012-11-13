var sweetRowFitter = {};
(function(){
  function checkEven( num, max ) {
    for( var i = max; i > 1; i-- ) {
      if( num % i === 0 ) return i;
    }
    return 0;
  }
  
  sweetRowFitter = function( desired, min, max ) {
    var group = [],
        sweet = max * ( max - 3 ),
        remainder = desired;
        
    if( desired < sweet ) {
      var even = checkEven( desired, max );
      if( even ) {
        var evenGroup = [];
        for( var i = 0; i < desired / even; i++ ) {
          evenGroup.push( even );
        }
        return evenGroup;
      }
    }        
        
    if( desired >= max ) {
      var rowsForMax = rowsOfSizeXForYItems( max, desired );        
      remainder -= rowsForMax * max;        
      
      for( var i = 0; i < rowsForMax; i++ ) {
        group.push( max );
      }    
    }
    
    function getForX( x ) {
      var rowsForCurrent = Math.floor( remainder / x ); 
      for( var j = 0; j < rowsForCurrent; j++ ) {
        group.push( x );
      }        
      remainder -= rowsForCurrent * x;            
    }

    for( var i = max - 1; i > 0; i-- ) {
      getForX( i );
      if( remainder <= 0 ) break;
    }
    
    return group.sort();
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