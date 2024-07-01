export interface IUseCase<Output, Input = null> {
  execute: (params: Input) => Output;
}
