"use strict";

const secaoContato = document.getElementById("contato");

document.querySelectorAll("[data-contato]").forEach((botao) => {
	botao.addEventListener("click", () => {
		secaoContato?.scrollIntoView({
			behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
				? "auto"
				: "smooth",
			block: "start"
		});
	});
});

const formularioContato = document.getElementById("form-contato");

if (formularioContato instanceof HTMLFormElement) {
	const statusContato = document.createElement("p");
	statusContato.className = "status-contato";
	statusContato.setAttribute("role", "status");
	statusContato.setAttribute("aria-live", "polite");
	formularioContato.append(statusContato);

	formularioContato.addEventListener("submit", (evento) => {
		evento.preventDefault();

		if (!formularioContato.reportValidity()) {
			return;
		}

		const dados = new FormData(formularioContato);
		const assunto = encodeURIComponent(`Contato pelo portfólio: ${dados.get("nome")}`);
		const corpo = encodeURIComponent(
			[
				`Nome: ${dados.get("nome")}`,
				`E-mail: ${dados.get("email")}`,
				`WhatsApp: ${dados.get("telefone") || "Não informado"}`,
				`Projeto: ${dados.get("projeto") || "Não informado"}`,
				"",
				"Mensagem:",
				dados.get("mensagem")
			].join("\n")
		);

		statusContato.textContent =
			"Seu aplicativo de e-mail será aberto para você enviar a mensagem.";
		window.location.href =
			`mailto:conceicaorafaela915@gmail.com?subject=${assunto}&body=${corpo}`;
	});
}
