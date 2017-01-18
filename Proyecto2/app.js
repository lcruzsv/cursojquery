var parejas = [];
var carta1 = 0, carta2 = 0;

/*
Inicializa el juego, recibe de como parametro la cantidad
de parejas con que se va a trabajar
*/
function inicio( CantParejas )
{
  parejas = [];
  for(i = 1; i<=CantParejas; i++ )
  {
    parejas.push(i);
    parejas.push(i);
  }

  parejas.sort(function() { return 0.5 - Math.random() });

  $('#tablero').html(''); //Limpiar tablero

  var actual = 0, hasta = 0, limite = (CantParejas )  * 2;

  while (actual < limite)
  {
    hasta = actual + 3; //Le agrego 3 mas, para mostrar 4
    if ( hasta < limite )
    {
        mostrarLinea(actual, hasta);
    }
    else {
      mostrarLinea(actual, (limite -1));
    }
    actual = hasta + 1;
  }

  $('#intentos').html(0);

  /*
    Agrega el codigo en todos los botones, para manejar la logica del juego
  */
  $(".pareja").click(
      function(){
        var boton = $(this);
        if (boton.attr('data-activo') == 1 && boton.attr('data-encontrado') == 0)
        {

          boton.attr('data-activo', 0);
          if (carta1 == 0)
          {
            carta1 = this.id;
            $(".pareja[data-encontrado='0']").addClass('reverso');
            boton.toggleClass("reverso");
          }
          else
          {
            $('#intentos').html( parseInt( $('#intentos').html()) + 1   );
            boton.toggleClass("reverso");
            carta2 = this.id;
            if (carta2 == carta1)
            {
              //Felicidades... encontraste una pareja
              $('.pareja-'+ this.id).attr('data-encontrado', '1'); //Marcar como encontrado

              // Fin???
              if ($(".pareja[data-encontrado='0']").length == 0)
              {
                alert("Ganaste!!!!!");
                //Reiniciar Juego
                inicio(6);
              }
            }
            else
            {

              $('.pareja-'+ carta1).attr('data-activo', '1'); //Activar todos...
              $('.pareja-'+ carta2).attr('data-activo', '1'); //Activar todos...
            }
            carta1 = cart2 = 0;

          }
        }
     } )
  };


/*
  Muestra una linea de parejas en la pagina web
*/
function mostrarLinea(desde, hasta)
{
  for(i = desde; i<= hasta; i++)
  {
      $('#tablero').append( '<button type="button" data-encontrado="0"  data-activo="1"  id="'+ parejas[i] + '" name="button" class="pareja pareja-'+ parejas[i] +' reverso"></button>'  );
  }
  $('#tablero').append('<br>');
}

/*
  Inicializa el juego al terminar de cargar el documento
*/
$(function() {
    inicio(6);
});
