import os
def tree_printer(root):
    for root, dirs, files in os.walk(root):
        for d in dirs:
            print(os.path.join(root, d))
tree_printer('.')