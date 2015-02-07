$(document).foundation();
function buscar(){
	var error = $("#palavra").hasClass("error");
	var resultado = $("#resultado").hasClass("display-none");
	var palavrass = $("#palavras").hasClass("display-none");
	var erro = $("#erro").hasClass("display-none");
	var carregando = $("#carregando").hasClass("display-none");

	setTimeout(function () {
		if(resultado != true){
			$("#resultado").addClass("display-none");
		}
		if(palavrass != true){
			$("#palavras").addClass("display-none");
		}
		if(erro != true){
			$("#erro").addClass("display-none");
		}
		if(error == true){
			$("#palavra").removeClass("error");
		}
		if(carregando == true){
			$("#carregando").removeClass("display-none");
		}
	}, 50);

	setTimeout(function () {
		var error = $("#palavra").hasClass("error");
		var resultado = $("#resultado").hasClass("display-none");
		var palavrass = $("#palavras").hasClass("display-none");
		var erro = $("#erro").hasClass("display-none");
		var carregando = $("#carregando").hasClass("display-none");

		var url = "ajax/pesquisa.php?palavra="+$('#palavra').val();
		$.getJSON(url, function(data){

			if(data.tipo == 1){
				if(resultado == true){
					$("#resultado").removeClass("display-none");
				}
				if(carregando != true){
					$("#carregando").addClass("display-none");
				}

				$("#palavraPesquisa").html(data.orth);
				$("#significado").html(data.def);

			}else{
				if(data.tipo == 2){
					if(palavrass == true){
						$("#palavras").removeClass("display-none");
					}
					if(carregando != true){
						$("#carregando").addClass("display-none");
					}
					var palavras = '';
					for (var i = data.numero; i >= 0; i--){
						palavras = palavras+'<a href="#" class="'+data[i]+' button mlrt-10" onClick="pesquisa(\''+data[i]+'\')">'+data[i]+'</a><input type="hidden" id= value="'+data[i]+'">';
					}
					$("#palavrasMostra").html(palavras);
				}else{
					if(error != true){
						$("#palavra").addClass("error");
					}
					if(erro == true){
						$("#erro").removeClass("display-none");
					}
					if(palavrass != true){
						$("#palavras").addClass("display-none");
					}
					if(carregando != true){
						$("#carregando").addClass("display-none");
					}
						$("#erro").html(data.erro);
				}
			}
		});	
	}, 60);
}
function pesquisa(palavra){
	var error = $("#palavra").hasClass("error");
	var resultado = $("#resultado").hasClass("display-none");
	var palavras = $("#palavras").hasClass("display-none");
	var erro = $("#erro").hasClass("display-none");
	var url = "ajax/pesquisa.php?palavra="+palavra;
	var carregando = $("#carregando").hasClass("display-none");
	if(carregando == true){
		$("#carregando").removeClass("display-none");
	}
	if(resultado != true){
		$("#resultado").addClass("display-none");
	}
	if(palavras != true){
		$("#palavras").addClass("display-none");
	}
	if(erro != true){
		$("#erro").addClass("display-none");
	}
	if(error == true){
		$("#palavra").removeClass("error");
	}
	var error = $("#palavra").hasClass("error");
	var resultado = $("#resultado").hasClass("display-none");
	var palavras = $("#palavras").hasClass("display-none");
	var erro = $("#erro").hasClass("display-none");
	var carregando = $("#carregando").hasClass("display-none");
	$.getJSON(url, function(data){
		var resultado = $("#resultado").hasClass("display-none");
		var palavras = $("#palavras").hasClass("display-none");
		if(resultado == true){
			$("#resultado").removeClass("display-none");
		}
		if(carregando != true){
			$("#carregando").addClass("display-none");
		}

		$("#palavraPesquisa").html(data.orth);
		$("#significado").html(data.def);
	});

}

$("#palavra").keypress(function (e) {
  if (e.keyCode == 13) {
    buscar();
	return false;    //<---- Add this line
  }
});