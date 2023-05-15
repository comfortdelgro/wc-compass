import {CdgBaseComponent} from '../../../shared/base-component'
import template from './options-nested-header.section.html'

export class CdgTableOptionsNestedHeaderSection extends CdgBaseComponent {
  checkable = false

  table
  toolbar
  pagination
  selectButton
  searchField
  startItem
  toItem
  totalItem
  filteredData = []

  currentPage = 1
  pageSize = 10

  timer

  constructor() {
    super()
    this.template = template
  }

  onInit() {
    this.fillInData()
  }

  fillInData() {
    this.table = this.querySelector('#sampleTableNestedHead')
    if (this.table) {
      this.table.options = {
        headClass: ['has-border'],
        columns: [
          {
            name: 'ID',
            width: '80px',
            fieldName: 'id',
            align: 'center',
            rowspan: 4,
          },
          {
            name: 'Name',
            width: 'auto',
            colspan: 5,
            align: 'center',
            columns: [
              {
                name: 'First name',
                align: 'center',
                colspan: 3,
                columns: [
                  {
                    name: 'First name 1',
                    align: 'center',
                    colspan: 2,
                    columns: [
                      {
                        name: 'First name 1-1',
                        fieldName: 'name.firstName.firstName1.firstName11',
                        align: 'center',
                      },
                      {
                        name: 'First name 1-2',
                        fieldName: 'name.firstName.firstName1.firstName12',
                        align: 'center',
                      },
                    ],
                  },
                  {
                    name: 'First name 2',
                    fieldName: 'name.firstName.firstName2',
                    align: 'center',
                    rowspan: 2,
                  },
                ],
              },
              {
                name: 'Last name',
                align: 'center',
                colspan: 2,
                columns: [
                  {
                    name: 'Last name 1',
                    fieldName: 'name.lastName.lastName1',
                    align: 'center',
                    rowspan: 2,
                  },
                  {
                    name: 'Last name 2',
                    fieldName: 'name.lastName.lastName2',
                    align: 'center',
                    rowspan: 2,
                  },
                ],
              },
            ],
          },
          {
            name: 'Age',
            width: '80px',
            fieldName: 'age',
            rowspan: 4,
            align: 'right',
          },
          {
            name: 'Sex',
            width: '140px',
            fieldName: 'gender',
            rowspan: 4,
            align: 'center',
          },
        ],
      }
      this.table.data = [
        {
          id: 123,
          name: {
            firstName: {
              firstName1: {
                firstName11: 'First Name 11',
                firstName12: 'First Name 12',
              },
              firstName2: 'First Name 2',
            },
            lastName: {
              lastName1: 'Last name 1',
              lastName2: 'Last name 2',
            },
          },
          age: 123,
          gender: 'Male',
        },
        {
          id: 1234,
          name: {
            firstName: {
              firstName1: {
                firstName11: 'First Name 11',
                firstName12: 'First Name 12',
              },
              firstName2: 'First Name 2',
            },
            lastName: {
              lastName1: 'Last name 1',
              lastName2: 'Last name 2',
            },
          },
          age: 123,
          gender: 'Male',
        },
        {
          id: 1235,
          name: {
            firstName: {
              firstName1: {
                firstName11: 'First Name 11',
                firstName12: 'First Name 12',
              },
              firstName2: 'First Name 2',
            },
            lastName: {
              lastName1: 'Last name 1',
              lastName2: 'Last name 2',
            },
          },
          age: 123,
          gender: 'Male',
        },
      ]
    }

    this.tableHeadBody = this.querySelector('#sampleTableHeadBody')
    if (this.tableHeadBody) {
      this.tableHeadBody.options = {
        headClass: ['has-border'],
        bodyClass: ['has-border'],
        columns: [
          {
            name: 'Name',
            fieldName: 'name',
            align: 'center',
            colspan: 3,
          },
          {
            name: 'Age',
            fieldName: 'age',
            align: 'center'
          },
        ],
        bodyColumns: [
          {
            width: '100px',
            fieldName: 'name.firstName',
            align: 'center',
            colspan: 2,
            columns: [
              {
                width: '100px',
                fieldName: 'name.firstName1',
                align: 'center',
              },
              {
                width: '100px',
                fieldName: 'name.firstName2',
                align: 'center',
              },
            ],
          },
          {
            width: '100px',
            fieldName: 'name.lastName',
            align: 'center',
            rowspan: 2,
          },
          {
            name: 'Age',
            width: '80px',
            fieldName: 'age',
            rowspan: 2,
            align: 'right'
          },
        ],
      }
      this.tableHeadBody.data = [
        {
          id: 123,
          key: 1,
          name: {
            firstName: 'Name',
            firstName1: 'David',
            firstName2: 'Dale',
            lastName: 'Castro',
          },
          age: 123,
          gender: 'Male',
        },
        {
          id: 124,
          key: 2,
          name: {
            firstName: 'ABC',
            firstName1: 'Tom',
            firstName2: 'Tommy',
            lastName: 'Trump',
          },
          age: 12,
          gender: 'Female',
        },
      ]
    }
  }
}
