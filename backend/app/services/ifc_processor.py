import ifcopenshell
import os

# Unidades de medida conhecidas no IFC
unit_map = {
    "METRE": "m",
    "CENTI.METRE": "cm",
    "CUBIC_METRE": "m³",
    "SQUARE_METRE": "m²",
    "SECOND": "s",
    "WATT": "W",
    "LUMEN": "lm",
    "AMPERE": "A",
    "KILO.PASCAL": "kPa",
    "KILO.GRAM": "kg"
}

def get_unit_from_ifc(ifc_file):
    """Busca unidades padrão dentro do arquivo IFC (IfcSIUnit)."""
    default_units = {}
    for unit in ifc_file.by_type("IfcSIUnit"):
        if hasattr(unit, "Name"):
            unit_name = unit.Name
            unit_symbol = unit_map.get(unit_name, unit_name)
            default_units[unit_name] = unit_symbol
    return default_units

def extract_unit_from_property(prop):
    """Tenta extrair a unidade de medida da propriedade."""
    if hasattr(prop, "Unit") and prop.Unit:
        if hasattr(prop.Unit, "Name"):
            return unit_map.get(prop.Unit.Name, prop.Unit.Name)
        elif hasattr(prop.Unit, "UnitType"):
            return unit_map.get(prop.Unit.UnitType, prop.Unit.UnitType)
    
    return None  # Retorna None caso não encontre a unidade diretamente

# 🔹 **Método 1: IfcPropertySingleValue**
def process_ifc_method_1(ifc_file, default_units):
    materiais_com_medidas = {}
    print("🔍 Tentando extrair materiais pelo método 1 (IfcPropertySingleValue)...")

    for prop in ifc_file.by_type("IfcPropertySingleValue"):
        if isinstance(prop.Name, str):
            nome_material = prop.Name.strip()
            valor_medida = 0
            unidade_medida = ""

            if hasattr(prop.NominalValue, 'wrappedValue'):
                raw_value = prop.NominalValue.wrappedValue  

                if isinstance(raw_value, (int, float)):
                    valor_medida = float(raw_value)
                else:
                    try:
                        valor_medida = float(str(raw_value).strip())
                    except ValueError:
                        valor_medida = 0  

            unidade_medida = extract_unit_from_property(prop)
            if not unidade_medida:
                unidade_medida = default_units.get(nome_material, "Não especificada")

            if nome_material not in materiais_com_medidas:
                materiais_com_medidas[nome_material] = {"Valor": 0, "Unidade": unidade_medida}

            materiais_com_medidas[nome_material]["Valor"] += valor_medida

    return materiais_com_medidas

# 🔹 **Método 2: IfcElementQuantity**
def process_ifc_method_2(ifc_file):
    materiais_com_medidas = {}
    print("🔄 Tentando extrair materiais pelo método 2 (IfcElementQuantity)...")

    for element in ifc_file.by_type("IfcElement"):
        material_names = set()

        if hasattr(element, "HasAssociations"):
            for association in element.HasAssociations:
                if association.is_a("IfcRelAssociatesMaterial"):
                    related_material = association.RelatingMaterial

                    if related_material.is_a("IfcMaterial"):
                        material_names.add(related_material.Name)
                    elif related_material.is_a("IfcMaterialLayerSetUsage"):
                        for layer in related_material.ForLayerSet.MaterialLayers:
                            material_names.add(layer.Material.Name)
                    elif related_material.is_a("IfcMaterialConstituentSet"):
                        for constituent in related_material.MaterialConstituents:
                            material_names.add(constituent.Material.Name)

        quantidade = 0
        unidade = "Não especificada"

        if hasattr(element, "IsDefinedBy"):
            for rel in element.IsDefinedBy:
                if rel.is_a("IfcRelDefinesByQuantity"):
                    quantity_set = rel.RelatingQuantity
                    if quantity_set.is_a("IfcElementQuantity"):
                        for quantity in quantity_set.Quantities:
                            if quantity.is_a("IfcQuantityVolume"):
                                quantidade = float(quantity.VolumeValue)
                                unidade = "m³"
                            elif quantity.is_a("IfcQuantityLength"):
                                quantidade = float(quantity.LengthValue)
                                unidade = "m"
                            elif quantity.is_a("IfcQuantityArea"):
                                quantidade = float(quantity.AreaValue)
                                unidade = "m²"

        for material_name in material_names:
            if material_name not in materiais_com_medidas:
                materiais_com_medidas[material_name] = {"Valor": 0, "Unidade": unidade}

            materiais_com_medidas[material_name]["Valor"] += quantidade

    return materiais_com_medidas

# 🔹 **Método 3: IfcElement + Superfície dos Materiais**
def process_ifc_method_3(ifc_file):
    materiais_com_medidas = {}
    print("🛠 Tentando extrair materiais pelo método 3 (IfcElement + Superfície)...")

    for element in ifc_file.by_type("IfcElement"):
        material_names = set()
        area_total = 0

        if hasattr(element, "HasAssociations"):
            for association in element.HasAssociations:
                if association.is_a("IfcRelAssociatesMaterial"):
                    related_material = association.RelatingMaterial
                    if related_material.is_a("IfcMaterial"):
                        material_names.add(related_material.Name)
                    elif related_material.is_a("IfcMaterialLayerSetUsage"):
                        for layer in related_material.ForLayerSet.MaterialLayers:
                            material_names.add(layer.Material.Name)
                    elif related_material.is_a("IfcMaterialConstituentSet"):
                        for constituent in related_material.MaterialConstituents:
                            material_names.add(constituent.Material.Name)

        if hasattr(element, "IsDefinedBy"):
            for rel in element.IsDefinedBy:
                if rel.is_a("IfcRelDefinesByProperties"):
                    prop_set = rel.RelatingPropertyDefinition
                    if prop_set.is_a("IfcPropertySet"):
                        for prop in prop_set.HasProperties:
                            if prop.is_a("IfcPropertySingleValue") and "Área" in prop.Name:
                                area_total += float(prop.NominalValue.wrappedValue)

        for material_name in material_names:
            if material_name not in materiais_com_medidas:
                materiais_com_medidas[material_name] = {"Valor": 0, "Unidade": "m²"}

            materiais_com_medidas[material_name]["Valor"] += area_total

    return materiais_com_medidas

# 🔹 **Processamento Completo**
def process_ifc(file_path):
    try:
        ifc_file = ifcopenshell.open(file_path)
    except Exception as e:
        print(f"❌ Erro ao abrir o arquivo IFC: {e}")
        return None

    default_units = get_unit_from_ifc(ifc_file)

    # 🔹 Executa os três métodos
    materiais_com_medidas = process_ifc_method_1(ifc_file, default_units)
    materiais_metodo_2 = process_ifc_method_2(ifc_file)
    materiais_metodo_3 = process_ifc_method_3(ifc_file)

    # 🔹 Combina os resultados dos três métodos
    for metodo in [materiais_metodo_2, materiais_metodo_3]:
        for material, data in metodo.items():
            if material in materiais_com_medidas:
                materiais_com_medidas[material]["Valor"] += data["Valor"]
            else:
                materiais_com_medidas[material] = data

    if not materiais_com_medidas:
        print("⚠️ Nenhum material foi identificado! O arquivo pode estar em um formato não compatível.")

    print("\n✅ Processamento concluído.\n")

    result_data = [
        {"Material": material, "Valor": round(data["Valor"], 2), "Unidade": data["Unidade"]}
        for material, data in materiais_com_medidas.items()
    ]

    return {
        "materiais": result_data
    }