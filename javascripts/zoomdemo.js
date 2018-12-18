var width = 960,
    height = 560,
    radius = Math.min(width, height) / 2;
    radius =250;
var x = d3.scale.linear()
    .range([0, 2 * Math.PI]);

var y = d3.scale.sqrt()
    .range([0, radius]);

var color = d3.scale.category20c();

var tempComName = $("#ComName");



var svg = d3.select("#main1").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + (width / 2 - 160) + "," + (height / 2+30) + ")");
//JIGEYISI

var partition = d3.layout.partition()
    .sort(null)
    .value(function(d) { return 1; });
var year = $("input[name='mode1']:checked").val();
var type = $("input[name='mode2']:checked").val();
var arc = d3.svg.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

var current;

// Keep track of the node that is currently being displayed as the root.
var node;
var totalSize =22389687.7;


d3.json("data/output.json", function(error, root) {
    node = root;
    var path = svg.datum(root).selectAll("path")
        .data(partition.nodes)
        .enter().append("path")
        .attr("d", arc)
        .style("fill", function(d) {
          return color((d.children ? d : d.parent).name); 
        })
        .on("click", click)
        .each(stash)
        .on("mouseover", mouseover)
        .on("mouseleave", mouseleave);
    d3.selectAll("input").on("change", function change() {
          var year = $("input[name='mode1']:checked").val();
          var type = $("input[name='mode2']:checked").val();

          if(year!=null && type!=null){
            $("#exp2").fadeOut('fast', function() {
              $("#exp1").fadeIn();
            });

          var mark_numb = d3.select("#mark_numb");
          if(type=="count"){
            totalSize = 500;
            mark_numb.text("Count");
          }
          else {switch(year){
            case "2006":totalSize = 22389687.7;break;
            case "2008":totalSize = 26831008.3;break;
            case "2010":totalSize = 23503131.7;break;
            case "2012":totalSize = 25337678.8;break;
            case "2014":totalSize = 30696000.32;break;
            
          }
          mark_numb.text("MarketCap");
        }

          if(year === "2006" && type ==="mark"){
            var value = function(d){
              return d.mark2006;
            }
          }else if(year === "2008" && type === "mark"){
            var value = function(d){
              return d.mark2008;
            }
          }else if(year === "2010" && type === "mark"){
            var value = function(d){
              return d.mark2010;
            }
          }else if(year === "2012" && type === "mark"){
            var value = function(d){
              return d.mark2012;
            }
          }else if(year === "2014" && type === "mark"){
            var value = function(d){
              return d.mark2014;
            }
          }else if(year === "2006" && type === "count"){
            var value = function(d){
              if(d.mark2006!=0)
                return 1;
              else
                return 0;
            }
          }else if(year === "2008" && type === "count"){
            var value = function(d){
              if(d.mark2008!=0)
                return 1;
              else 
                return 0;
            }
          }else if(year === "2010" && type === "count"){
            var value = function(d){
              if(d.mark2010!=0)
                return 1;
              else 
                return 0;
            }
          }else if(year === "2012" && type === "count"){
            var value = function(d){
              if(d.mark2012!=0)
                return 1;
              else 
                return 0;
            }
          }else if(year === "2014" && type === "count"){
            var value = function(d){
              if(d.mark2014!=0)
                return 1;
              else 
                return 0;
            }
          }

      if(current){
            changeexplan(current);
          }

      path
          .data(partition.value(value).nodes)
        .transition()
          .duration(1000)
          .attrTween("d", arcTweenData);

        }else{
            //console.log(0);
          }


    });



    
    function click(d) {
      node = d;
      path.transition()
        .duration(1000)
        .attrTween("d", arcTweenZoom(d));
    }
  });

d3.select(self.frameElement).style("height", height + "px");

// Setup for switching data: stash the old values for transition.
function stash(d) {
  d.x0 = d.x;
  d.dx0 = d.dx;
}

// When switching data: interpolate the arcs in data space.
function arcTweenData(a, i) {
  var oi = d3.interpolate({x: a.x0, dx: a.dx0}, a);
  function tween(t) {
    var b = oi(t);
    a.x0 = b.x;
    a.dx0 = b.dx;
    return arc(b);
  }
  if (i == 0) {
   // If we are on the first arc, adjust the x domain to match the root node
   // at the current zoom level. (We only need to do this once.)
    var xd = d3.interpolate(x.domain(), [node.x, node.x + node.dx]);
    return function(t) {
      x.domain(xd(t));
      return tween(t);
    };
  } else {
    return tween;
  }
}

// When zooming: interpolate the scales.
function arcTweenZoom(d) {
  var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
      yd = d3.interpolate(y.domain(), [d.y, 1]),
      yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
  return function(d, i) {
    return i
        ? function(t) { return arc(d); }
        : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
  };
}


// Given a node in a partition layout, return an array of all of its ancestor
// nodes, highest first, but excluding the root.
function getAncestors(node) {
  var path = [];
  var current = node;
  while (current.parent) {
    path.unshift(current);
    current = current.parent;
  }
  return path;
}

function mouseover(d) {
  current = d;
  var sequenceArray = getAncestors(d);
  svg.selectAll("path")
    .filter(function(node) {
          return (sequenceArray.indexOf(node) >= 0);
      })
    .style("opacity", 0.4)
    .style("border-color", "red");
    changeexplan(d);

  var ComName = d.name;
  d3.select("#ComName2")
    .text(ComName);
  /*if(ComName.length>=20){
    tempComName.attr("font-size", "2em");
  }else{
    tempComName.css("font-size", "2.5em");  
  }*/
}

function changeexplan(d){
  var year = $("input[name='mode1']:checked").val();
  var type = $("input[name='mode2']:checked").val();
  var ComName = d.name;
  d3.select("#ComName")
      .text(ComName);

  var thisyearmark;

  thisyearmark = d.value.toPrecision(1);
  thisyearmark = Math.round(d.value*10)/10.0;

  if(type=="count"){
    d3.select("#MarketCap")
        .text(thisyearmark);
  }else{
    d3.select("#MarketCap")
        .text(thisyearmark+"$m");
  }
  var percentage = (100 * thisyearmark / totalSize).toFixed(1);
  var percentageString = percentage + "%";
  if (percentage < 0.1) {
    percentageString = "< 0.1%";
  }
//  console.log(thisyearmark+" "+totalSize);

  if(thisyearmark)

  d3.select("#Percentage")
    .text(percentageString);
  

  var inrank=null;
  switch(year){
    case("2006"):inrank = d.rank2006; break;
    case("2008"):inrank = d.rank2008; break;
    case("2010"):inrank = d.rank2010; break;
    case("2012"):inrank = d.rank2012; break;
    case("2014"):inrank = d.rank2014; break;
  };
  if(inrank!=null){
    d3.select("#Rank").text(inrank);
    $("#labelrank").show();
  }else{
    $("#Rank").text("");
    $("#labelrank").hide();
  }
  d3.select("#explanation1")
      .style("visibility", "");
}

function mouseleave(d) {
  d3.selectAll("path")
      .style("opacity", 1)
}

function getAncestors(node) {
  var path = [];
  var current = node;
  while (current.parent) {
    path.unshift(current);
    current = current.parent;
  }
  return path;
}