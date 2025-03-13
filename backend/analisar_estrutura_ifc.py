import ifcopenshell

def analisar_estrutura_ifc(file_path):
    """Lê o IFC e exibe os tipos de entidades e algumas instâncias para análise"""
    try:
        ifc_file = ifcopenshell.open(file_path)
    except Exception as e:
        print(f"❌ Erro ao abrir o arquivo IFC: {e}")
        return

    # Listar os tipos de entidades no arquivo
    entity_types = set(entity.is_a() for entity in ifc_file)
    print("📌 Tipos de entidades encontradas no IFC:")
    for entity in sorted(entity_types):
        print(f"  - {entity}")

    # Exibir algumas instâncias de materiais e propriedades
    print("\n🔍 Exemplo de instâncias encontradas:")
    for entity_type in ["IfcMaterial", "IfcPropertySet", "IfcElementQuantity"]:
        entities = ifc_file.by_type(entity_type)
        print(f"\n🔹 {entity_type} (Total: {len(entities)})")
        for entity in entities[:5]:  # Exibir apenas 5 exemplos
            print(f"  - {entity}")

# Chame a função para cada arquivo IFC que deseja analisar
# analisar_estrutura_ifc("uploaded_files/Edificio SENAI.ifc")
# analisar_estrutura_ifc("uploaded_files/Projeto1 - ECM.ifc")