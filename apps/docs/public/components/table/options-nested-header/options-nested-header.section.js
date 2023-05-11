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
    this.table = this.querySelector('#sampleTable')
    this.table.checkable = false
    this.table.options = {
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
          fieldName: 'name',
          colspan: 5,
          align: 'center',
          children: [
            {
              name: 'First name',
              width: '100px',
              fieldName: 'firstName',
              align: 'center',
              colspan: 3,
              children: [
                {
                  name: 'First name 1',
                  width: '100px',
                  fieldName: 'firstName1',
                  align: 'center',
                  colspan: 2,
                  children: [
                    {
                      name: 'First name 1-1',
                      width: '100px',
                      fieldName: 'firstName11',
                      align: 'center',
                    },
                    {
                      name: 'First name 1-2',
                      width: '100px',
                      fieldName: 'firstName12',
                      align: 'center',
                    },
                  ],
                },
                {
                  name: 'First name 2',
                  width: '100px',
                  fieldName: 'firstName2',
                  align: 'center',
                  rowspan: 2,
                },
              ],
            },
            {
              name: 'Last name',
              width: '100px',
              fieldName: 'lastName',
              align: 'center',
              colspan: 2,
              children: [
                {
                  name: 'Last name 1',
                  width: '100px',
                  fieldName: 'lastName1',
                  align: 'center',
                  rowspan: 2,
                },
                {
                  name: 'Last name 2',
                  width: '100px',
                  fieldName: 'lastName2',
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
          sortable: true,
          rowspan: 4,
        },
        {
          name: 'Sex',
          width: '140px',
          fieldName: 'gender',
          rowspan: 4,
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
    ]
  }
}
