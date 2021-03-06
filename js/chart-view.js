$(function () {
  // Empty chart
  var chart = new Highcharts.Chart({
    chart: {
      renderTo: 'container',
      type: 'line',
    },
    title: {
      text: 'Demo Chart',
    },
    xAxis: {
      labels: {
        formatter: function() {
          return this.value + ' nm';
        }
      },
      units: 'nm',
      title: {
        text: 'Wavelength'
      },
      min: 900,
      crosshair: true,
    },
    yAxis: {
      title: {
        text: 'Absorbance'
      },
    },
    tooltip: {
      formatter: function() {
        var s = '<b>' + this.x + ' nm</b>';

        $.each(this.points, function() {
          s += '<br/>' + this.series.name + ': ' +
            this.y;
        });

        return s;
      },
      shared: true,
    },
  });

  function addData(csvFile) {
    Papa.parse(csvFile, {
      header: true,
      dynamicTyping: true,
      comments: "'",
      complete: function(results) {
        var data = $.map(results.data, function(res) {
          if (res.Wavelength === 0.0)
            return null;
          else {
            return {
              x: res.Wavelength,
              y: res.Absorbance
            };
          }
        })
        chart.addSeries({
          name: csvFile.name,
          data: data,
          marker: {
            enabled: false
          },
        });
      }
    });
  }

  $("#csv-add").click(function() {
    csvFiles = $("#csv-files")[0].files;
    $.each(csvFiles, function(index, file) {
      addData(file);
    });
  });

  $("#clear").click(function() {
    location.reload();
  });
});
