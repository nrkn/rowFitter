var rowFitter = {};
(function(){
  var memoized = {},
      sweet;
      
  function checkEven( num, max ) {
    for( var i = max; i > 1; i-- ) {
      if( num % i === 0 ) return i;
    }
    return 0;
  }
  
  function deltaCompare( a, b ) {
    var deltaA = Math.max.apply( null, a ) - Math.min.apply( null, a ),
        deltaB = Math.max.apply( null, b ) - Math.min.apply( null, b );
   
    return deltaA > deltaB;  
  }
  
  rowFitter = function( desired, min, max ) {
    memoized = {};
    sweet = max * ( max - 3 );
    return getRow( desired, min, max ).sort();
  }
  
  function getRow( desired, min, max ) {
    var key = min + '-' + max + '-' + desired;
    
    if( memoized[ key ] !== undefined ) {
      return memoized[ key ];
    }

    if( desired <= max ) {
      var result = [ desired ];
      memoized[ key ] = result;
      return result;
    }    
    
    var possibleGroups = [];
    
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
    
    for( var i = max; i >= min; i-- ) {      
      if( desired - i >= min ) {
        var remainder = getRow( desired - i, min, max );        
        possibleGroups.push( [ i ].concat( remainder ) );      
      }
    }
    
    if( possibleGroups.length < 1 ) {
      for( var i = max; i >= min; i-- ) {      
        var remainder = getRow( desired - i, min, max );        
        possibleGroups.push( [ i ].concat( remainder ) );      
      }    
    }
    
    possibleGroups.sort( function( a, b ) {
      if( a.length === b.length ) {
        return deltaCompare( a, b );
      }
      return a.length > b.length;
    });
    
    memoized[ key ] = possibleGroups[ 0 ];
    return possibleGroups[ 0 ];
  }
})();