import ListItem from "./ListItem";

interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObj: ListItem): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
  static instance: FullList = new FullList();
  private constructor(private _list: ListItem[] = []) {}

  get list(): ListItem[] {
    return this._list;
  }

  set list(list: ListItem[]) {
    this._list = list;
  }

  load() {
    console.log("Load all list ....");
    const storedList: string | null = localStorage.getItem("myLst");
    if (typeof storedList !== "string") return;
    const parsedList: { _id: string; _item: string; _checked: boolean }[]  = JSON.parse(storedList);

    parsedList.forEach(itemObj =>{
        const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked)
        FullList.instance.addItem(newListItem)
    })
  }

  save(): void {
    console.log("save list ....");
    localStorage.setItem("myList", JSON.stringify(this._list));
  }

  clearList(): void {
    console.log("clear all list ....");
    this._list = [];
    this.save();
  }

  addItem(itemObj: ListItem): void {
    console.log("addItem all list ....");
    this._list.push(itemObj);
    this.save();
  }

  removeItem(id: string): void {
    console.log("remove selected list  list ....");
    this._list.filter((item) => item.id != id);
    this.save();
  }
}
