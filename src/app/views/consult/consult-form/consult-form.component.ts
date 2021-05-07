import {Component, Injector, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {BaseResourceFormComponentDirective} from '../../../shared/components/base-resource-form/base-resource-form-component.directive';
import {ConsultModel} from '../../../shared/resources/consult/consult.model';
import {ConsultService} from '../../../shared/resources/consult/consult.service';
import {SpecialtiesService} from '../../../shared/resources/specialties/specialties.service';
import {SpecialtiesModel} from '../../../shared/resources/specialties/specialties.model';
import {DoctorModel} from '../../../shared/resources/doctor/doctor.model';
import {DoctorService} from '../../../shared/resources/doctor/doctor.service';
import {ScheduleService} from '../../../shared/resources/schedule/schedule.service';
import {ScheduleModel} from '../../../shared/resources/schedule/schedule.model';
import {MatSelectChange} from '@angular/material/select';


@Component({
  selector: 'app-consult-form',
  templateUrl: 'consult-form.component.html',
  styleUrls: ['consult-form.component.scss']
})
export class ConsultFormComponent extends BaseResourceFormComponentDirective<ConsultModel> implements OnInit {

  specialties: SpecialtiesModel[];
  doctors: DoctorModel[];
  filteredDoctors: DoctorModel[];

  schedules: ScheduleModel[];
  selectedSchedule: ScheduleModel;

  constructor(
    protected consultService: ConsultService,
    protected injector: Injector,
    protected specialtiesService: SpecialtiesService,
    protected doctorService: DoctorService,
    protected scheduleService: ScheduleService,
  ) {
    super(injector, new ConsultModel(), consultService, ConsultModel.fromJson);
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      especialidade: [null],
      medico: [null],
      agenda: [null],
      agenda_id: [null, [Validators.required]],
      horario: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.currentAction = 'new';
    super.ngOnInit();
    this.loadSpecialties();
    this.loadDoctors();
  }

  loadSchedules(): void {
    const filters = {
      especialidade: this.resourceForm.get('especialidade').value?.id,
      medico: this.resourceForm.get('medico').value?.id,
    };

    console.log('filters', filters);

    this.scheduleService.getAll(filters).subscribe(
      (resources) => {
        this.schedules = resources;
      });
  }

  loadSpecialties(): void {
    this.specialtiesService.getAll().subscribe(
      (resources) => {
        this.specialties = resources;
      });
  }

  loadDoctors(): void {
    this.doctorService.getAll().subscribe(
      (resources) => {
        this.doctors = resources;
      });
  }

  filterDoctors(): void {
    this.filteredDoctors = this.doctors.filter(doctor => {
      return doctor.especialidade.id === this.resourceForm.get('especialidade').value?.id;
    });
  }

  setAgendaId(event: MatSelectChange): void {
    this.resourceForm.get('agenda_id').setValue(event.value?.id);
  }
}
