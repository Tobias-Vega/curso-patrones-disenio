/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */

class CodeEditorState {
  readonly content: string;
  readonly cursorPosition: number;
  readonly unSaveChanged: boolean;

  constructor(content: string, cursorPosition: number, unSavechanged: boolean) {
    this.content = content;
    this.cursorPosition = cursorPosition;
    this.unSaveChanged = unSavechanged;

  }

  copyWith({
    content,
    cursorPosition,
    unSaveChanged
  }: Partial<CodeEditorState>): CodeEditorState {

    return new CodeEditorState(
      content ?? this.content,
      cursorPosition ?? this.cursorPosition,
      unSaveChanged ?? this.unSaveChanged,
    )
  }

  displayState() {
    console.log('\nEstado del editor');
    console.log(`
        Contenido: ${this.content}
        Cursor Pos: ${this.cursorPosition}
        Unsaved changes: ${this.unSaveChanged}
      `)
  }
}


class CodeEditorHistory {

  private history: CodeEditorState[] = [];
  private currentIndex: number = -1;

  save(state: CodeEditorState): void {
    this.history.push(state);
    this.currentIndex++;
  }

  undo(): CodeEditorState | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    }

    return null;
  }

  redo(): CodeEditorState | null {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }

    return null;
  }

}

function main() {

  const history = new CodeEditorHistory();

  let editorState = new CodeEditorState("console.log('Hola mundo')", 2, false);

  history.save(editorState);
  console.log('Estado inicial');
  editorState.displayState();

  editorState = editorState.copyWith({
    content: "console.log('Hola mundo'); \nconsole.log('Nueva línea');",
    cursorPosition: 3,
    unSaveChanged: true,
  })

  history.save(editorState);

  console.log('\nDespués del primer cambio');
  editorState.displayState();


  console.log('\nDespués del mover el cursor');
  editorState = editorState.copyWith({ cursorPosition: 5 });
  history.save(editorState);
  editorState.displayState();

  console.log('\nDespués del mover del Undo');
  editorState = history.undo()!;
  editorState.displayState();

  console.log('\nDespués del mover del Redo');
  editorState = history.redo()!;
  editorState.displayState();
}

main()