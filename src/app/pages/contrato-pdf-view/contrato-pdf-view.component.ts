import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ContratoPdfViewService } from '../../services/contrato-pdf-view.service';

@Component({
  selector: 'app-contrato-pdf-view',
  templateUrl: './contrato-pdf-view.component.html',
  styleUrls: ['./contrato-pdf-view.component.css']
})
export class ContratoPdfViewComponent implements OnInit {

  contratoHtml: SafeHtml | null = null;
  contratoId!: string;
  contrato_aluguel_id!: string

  constructor(
    private route: ActivatedRoute,
    private contratoService: ContratoPdfViewService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.contratoId = this.route.snapshot.paramMap.get('id')!;  // contrato_aluguel_id: 93a9ae3a-4f34-4899-ac0d-4f7b436532f7

    this.route.queryParams.subscribe(params => {
      this.contrato_aluguel_id = params['contrato_aluguel_id'];

      if (this.contratoId && this.contrato_aluguel_id){
        this.contratoService.gerarHtmlContrato(this.contratoId, this.contrato_aluguel_id).subscribe({
          next: (data) => {
            this.contratoHtml = this.sanitizer.bypassSecurityTrustHtml(data.html);
          },
          error: err => {
            console.log('Erro: está faltando parametrossss', err)
          }
        });
      } else{
        console.log('Erro: está faltando parametrossss', this.contratoId, this.contrato_aluguel_id)
        console.warn('Parâmetros ausentes!')
      }
    });
  }

  baixarPdf(): void {
    this.contratoService.gerarPdfContrato(
      this.contratoId,
      this.contrato_aluguel_id
    ).subscribe({
      next: (blob) => {
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = `contrato_${this.contratoId}.pdf`;
        a.click();
      },
      error: (err) => {
        console.log('Erro ao gerar o pdf: ', err);
      }
    });
  }

}
